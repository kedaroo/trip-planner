import { useState, useEffect } from "react";

import SearchBar from "./components/SearchBar";
import TripItinerary from "./components/TripItinerary";
import VehicleForm from "./components/VehicleForm";
import MapView from "./components/MapView";

import Button from "@mui/material/Button";

import "./App.css";
export default function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [soc, setSoc] = useState(null);
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [route, setRoute] = useState(null);

  const API_KEY = "z6DIYeUVZ6oFAYoGIfL2AYS6uLuUi7sdLIoTFuALy3o";

  const handleClick = async () => {
    const url = `https://router.hereapi.com/v8/routes?apiKey=${API_KEY}&transportMode=car&origin=${origin}&destination=${destination}&return=summary,polyline&ev[freeFlowSpeedTable]=0,0.239,27,0.239,45,0.259,60,0.196,75,0.207,90,0.238,100,0.26,110,0.296,120,0.337,130,0.351,250,0.351&ev[makeReachable]=true&ev[initialCharge]=${soc}&ev[maxCharge]=${batteryCapacity}&ev[chargingCurve]=0,239,32,199,56,167,60,130,64,111,68,83,72,55,76,33,78,17,80,1&ev[maxChargeAfterChargingStation]=${
      batteryCapacity * 0.9
    }&ev[connectorTypes]=chademo,iec62196Type1Combo,iec62196Type2Combo,tesla`;

    const res = await fetch(url);
    const data = await res.json();
    setRoute(data);
  };

  return (
    <div className="App">
      <header className="header">
        <i className="fa-regular fa-circle-question"></i>
        <div>EV Trip Planner</div>
      </header>
      <div className="container">
        <div className="column column-1">
          <div className="column-1-item form">
            <div className="input-form">
              <SearchBar setLoc={setOrigin} placeholder={"Origin"} />
              <SearchBar setLoc={setDestination} placeholder={"Destination"} />
            </div>
            <VehicleForm
              setSoc={setSoc}
              setBatteryCapacity={setBatteryCapacity}
            />
            <Button
              className="button"
              onClick={handleClick}
              variant="contained"
            >
              Calculate Route
            </Button>
          </div>
          <div className="column-1-item mapview">
            {route ? <MapView route={route} /> : "Route will appear here"}
          </div>
        </div>

        {route ? (
          <div className="column overflow-auto itinerary">
            <TripItinerary route={route} batteryCapacity={batteryCapacity} />
          </div>
        ) : (
          <div className="column column-2 overflow-auto itinerary">
            "Trip Itinerary will appear here"
          </div>
        )}
      </div>
    </div>
  );
}
