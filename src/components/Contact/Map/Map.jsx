import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import React, { useEffect, useRef } from "react";
import "./map.css";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const india = { lng: 79.9454, lat: 23.1815 };
  const zoom = 14;
  maptilersdk.config.apiKey = "ZZQNP9HxV1ao4LCbAaKJ";

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [india.lng, india.lat],
      zoom: zoom,
    });

    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([79.9454, 23.1815])
      .addTo(map.current);
  }, [india.lng, india.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
