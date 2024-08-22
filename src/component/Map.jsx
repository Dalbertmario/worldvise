import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCity } from "../contexts/CitiesProvider";
import useGeoLoaction from "./hooks/useGeoLoaction";
import Button from "./Button";
import { UsePosition } from "./hooks/UsePosition";
function Map() {
  const { loading, postion: geoloaction, getPostion } = useGeoLoaction();
  const [Maplat, Maplng] = UsePosition();
  const [position, setPosition] = useState([0, 0]);

  const { cities } = useCity();
  // const Maplng = searchParams.get("lng");
  // const Maplat = searchParams.get("lat");
  useEffect(
    function () {
      if (Maplat && Maplng) setPosition([Maplat, Maplng]);
    },
    [Maplat, Maplng]
  );
  useEffect(
    function () {
      if (geoloaction) setPosition([geoloaction.lat, geoloaction.lng]);
    },
    [geoloaction]
  );
  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={() => getPostion()}>
        {loading ? "Loading" : "use your position"}
      </Button>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((el) => (
          <Marker position={position}>
            <Popup>
              <span>
                {el.cityName}
                {el.emoji}
              </span>
            </Popup>
          </Marker>
        ))}
        <DetectClick />
        <ChangeCenter position={position} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
}
function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
export default Map;
