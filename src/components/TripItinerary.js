import { useState, useEffect } from "react";
import { reverseGeoCode } from "../utils/reverseGeoCode";

export default function TripItinerary({ route }) {
  const sections = route.routes[0].sections;

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      let results = [];
      for (let section of sections) {
        const place = await reverseGeoCode(section.arrival.place.location);
        const time = new Date(section.arrival.time).toLocaleString();
        let chargingTime;
        let arrivalCharge;
        let targetCharge;
        if (section.postActions) {
          chargingTime = section.postActions[0].duration;
          arrivalCharge = section.postActions[0].arrivalCharge;
          targetCharge = section.postActions[0].targetCharge;
        } else {
          arrivalCharge = section.arrival.charge;
        }
        results.push({
          place,
          time,
          chargingTime,
          arrivalCharge,
          targetCharge,
        });
        console.log({ place, time, chargingTime, arrivalCharge, targetCharge });
      }
      setPlaces(results);
    };

    fetchPlaces();

    return () => setPlaces([]);
  }, [sections]);

  return (
    <div>
      <h2>Itinerary</h2>
      <ol>
        {places &&
          places.map((place) => (
            <li key={Math.random()}>
              <p>PLACE: {place.place}</p>
              <p>TIME: {place.time}</p>
              {place.chargingTime && <p>CHARGE TIME: {place.chargingTime}</p>}
              {place.arrivalCharge && (
                <p>CHARGE ON ARRIVAL: {place.arrivalCharge}</p>
              )}
              {place.targetCharge && <p>TARGET CHARGE: {place.targetCharge}</p>}
            </li>
          ))}
      </ol>
    </div>
  );
}
