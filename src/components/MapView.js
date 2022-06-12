import { useEffect, useRef } from "react";

export default function MapView({ route }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const H = window.H;

    const platform = new H.service.Platform({
      apikey: "z6DIYeUVZ6oFAYoGIfL2AYS6uLuUi7sdLIoTFuALy3o",
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 50, lng: 5 },
      zoom: 4,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    const ui = H.ui.UI.createDefault(map, defaultLayers);

    route.routes[0].sections.forEach((section) => {
      console.log(section)
      // Create a linestring to use as a point source for the route line
      let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

      // Create a polyline to display the route:
      let routeLine = new H.map.Polyline(linestring, {
        style: { strokeColor: "blue", lineWidth: 3 },
      });

      // Create a marker for the start point:
      let startMarker = new H.map.Marker(section.departure.place.location);

      // Create a marker for the end point:
      let endMarker = new H.map.Marker(section.arrival.place.location);

      // Add the route polyline and the two markers to the map:
      map.addObjects([routeLine, startMarker, endMarker]);

      // Set the map's viewport to make the whole route visible:
      map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
    });
  }, [route]);

  return <div ref={mapRef} style={{ height: "50vh" }}></div>;
}
