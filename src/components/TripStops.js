import { secondsToHms } from "../utils/secondToHms";

export default function TripStops({ stop }) {
  return (
    <div className="container-stop">
      <div className="charging-time">
        <i class="fa-solid fa-charging-station"></i>
        <p>{secondsToHms(stop.chargingTime)}</p>
      </div>

      <div>
        <h3>ETA</h3>
        {/* <p>{tripSummary.eta}</p> */}
      </div>

      <div>
        <h3>Stops</h3>
        {/* <p>{tripSummary.stops}</p> */}
      </div>
    </div>
  );
}
