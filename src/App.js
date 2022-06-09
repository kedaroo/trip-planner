import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import VehicleForm from "./components/VehicleForm";

export default function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [soc, setSoc] = useState(null);
  const [batteryCapacity, setBatteryCapacity] = useState("");

  useEffect(() => {
    if (origin) {
      console.log(origin);
    }
  }, [origin]);

  useEffect(() => {
    if (destination) {
      console.log(destination);
    }
  }, [destination]);

  useEffect(() => {
    if (soc) {
      console.log(soc);
    }
  }, [soc]);

  useEffect(() => {
    if (batteryCapacity) {
      console.log(batteryCapacity);
    }
  }, [batteryCapacity]);

  return (
    <div className="App">
      <div className="input-form">
        <SearchBar setLoc={setOrigin} placeholder={"Origin"} />
        <SearchBar setLoc={setDestination} placeholder={"Destination"} />
      </div>
      <VehicleForm setSoc={setSoc} setBatteryCapacity={setBatteryCapacity} />
    </div>
  );
}
