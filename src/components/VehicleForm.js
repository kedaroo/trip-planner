import { useState } from "react";
import SocSlider from "./SocSlider";
import TextField from "@mui/material/TextField";

export default function VehicleForm({ setSoc, setBatteryCapacity }) {
  const [maxCapacity, setMaxCapacity] = useState("");

  return (
    <div>
      <TextField
        id="outlined-basic"
        type="number"
        label="Battery Capacity in kWh"
        variant="outlined"
        InputProps={{ inputProps: { min: 0 } }}
        onChange={(e) => {
          setBatteryCapacity(e.target.value);
          setMaxCapacity(e.target.value);
        }}
      />
      {/* <label>
        <span>Total Battery Capacity</span>
        <input type={"number"} min={1} max={80} onChange={(e) => {}} />
      </label> */}
      <SocSlider setSoc={setSoc} maxCapacity={maxCapacity} />
    </div>
  );
}
