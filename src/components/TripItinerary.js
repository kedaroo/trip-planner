import { useState, useEffect } from "react";
import { reverseGeoCode } from "../utils/reverseGeoCode";
import TripStops from "./TripStops";
import { secondsToHms } from "../utils/secondToHms";
import TripSummary from "./TripSummary";

export default function TripItinerary({ route }) {
  const sections = route.routes[0].sections;

  const [places, setPlaces] = useState([]);
  const [distance, setDistance] = useState(null);
  const [stops, setStops] = useState(null);
  const [eta, setEta] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      let results = [];
      let totalDistance = 0;
      let totalDuration = 0;
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
        totalDistance += section.summary.length / 1000;
        totalDuration += section.summary.duration;
      }

      const totalEta = secondsToHms(totalDuration);
      setPlaces(results);
      setDistance(Math.round(totalDistance));
      setStops(sections.length - 1);
      setEta(totalEta);
    };

    fetchPlaces();

    return () => setPlaces([]);
  }, [sections, eta]);

  return (
    <div className='container-itinerary'>
      <TripSummary tripSummary={{distance, stops, eta}} />
      <ol>
        {places &&
          places.map((place) => (
            <li key={Math.random()} className='stop-item'>
              <TripStops stop={place}/>
              <p>PLACE: {place.place}</p>
              {/* <p>TIME: {place.time}</p>
              {place.chargingTime && <p>CHARGE TIME: {place.chargingTime}</p>}
              {place.arrivalCharge && (
                <p>CHARGE ON ARRIVAL: {place.arrivalCharge}</p>
              )}
              {place.targetCharge && <p>TARGET CHARGE: {place.targetCharge}</p>} */}
            </li>
          ))}
      </ol>
    </div>
  );
}
