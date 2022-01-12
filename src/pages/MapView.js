import React, { useEffect, useState } from "react";
import MapContainer from "../components/MapContainer";

function MapView() {
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    const crnt = JSON.parse(localStorage.getItem("savedLocation"));
    setCurrent(crnt);
  }, []);
  return (
    <>
      <div style={{ width: "100vh", height: "100vh" }}>
        {current === null ? (
          <p>Loading...</p>
        ) : (
          <MapContainer
            lat={current.latitude}
            lng={current.longitude}
            city={current.city}
            fullSize={true}
          />
        )}
      </div>
    </>
  );
}

export default MapView;
