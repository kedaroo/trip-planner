import SocSlider from "./SocSlider";

export default function VehicleForm({ setSoc, setBatteryCapacity }) {
  return (
    <div>
      <SocSlider setSoc={setSoc} />
      <label>
        <span>Total Battery Capacity</span>
        <input
          type={"number"}
          min={1}
          onChange={(e) => setBatteryCapacity(e.target.value)}
        />
      </label>
    </div>
  );
}
