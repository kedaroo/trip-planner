import { useState, useEffect } from "react";

import SearchBar from "./components/SearchBar";
import TripItinerary from "./components/TripItinerary";
import VehicleForm from "./components/VehicleForm";

import "./App.css";
import MapView from "./components/MapView";

export default function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [soc, setSoc] = useState(null);
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [route, setRoute] = useState(null);

  const API_KEY = "z6DIYeUVZ6oFAYoGIfL2AYS6uLuUi7sdLIoTFuALy3o";

  const handleClick = async () => {
    const url = `https://router.hereapi.com/v8/routes?apiKey=${API_KEY}&chargingSetupDuration=300&transportMode=car&origin=${origin}&destination=${destination}&return=summary,polyline&ev[freeFlowSpeedTable]=0,0.239,27,0.239,45,0.259,60,0.196,75,0.207,90,0.238,100,0.26,110,0.296,120,0.337,130,0.351,250,0.351&ev[makeReachable]=true&ev[initialCharge]=${soc}&ev[maxCharge]=${batteryCapacity}&ev[chargingCurve]=0,239,32,199,56,167,60,130,64,111,68,83,72,55,76,33,78,17,80,1&ev[maxChargeAfterChargingStation]=${
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
        <div className="column-1">
          <div>
            <div className="input-form">
              <SearchBar
                className="search-bar"
                setLoc={setOrigin}
                placeholder={"Origin"}
              />
              <SearchBar
                className="search-bar"
                setLoc={setDestination}
                placeholder={"Destination"}
              />
            </div>
            <VehicleForm
              setSoc={setSoc}
              setBatteryCapacity={setBatteryCapacity}
            />
            <button onClick={handleClick}>Calculate Route</button>
          </div>
          <div >{route && <MapView route={route} />}</div>
        </div>
        <div className="overflow-auto">{route && <TripItinerary route={route} />}</div>
      </div>
    </div>
  );
}
