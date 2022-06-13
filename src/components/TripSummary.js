import './TripSummary.css'

export default function TripSummary({ tripSummary }) {
  return (
    <div>
      <h2 style={{marginTop: 0}}>Trip Summary</h2>
      <div className='trip-summary'>
        <div>
          <h3>Distance</h3>
          <p>{tripSummary.distance}</p>
        </div>

        <div>
          <h3>ETA</h3>
          <p>{tripSummary.eta}</p>
        </div>

        <div>
          <h3>Stops</h3>
          <p>{tripSummary.stops}</p>
        </div>
      </div>
    </div>
  );
}
