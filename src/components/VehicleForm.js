import { useState } from "react";
import SocSlider from "./SocSlider";

export default function VehicleForm({ setSoc, setBatteryCapacity }) {
  const [maxCapacity, setMaxCapacity] = useState("");

  return (
    <div>
      <label>
        <span>Total Battery Capacity</span>
        <input
          type={"number"}
          min={1}
          max={80}
          onChange={(e) => {
            setBatteryCapacity(e.target.value)
            setMaxCapacity(e.target.value)
          }}
        />
      </label>
      <SocSlider setSoc={setSoc} maxCapacity={maxCapacity}/>
    </div>
  );
}
