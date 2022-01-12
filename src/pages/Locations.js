import React, { useEffect, useState } from "react";
import { currentDay, dayOptions, genNumber, getDistance } from "../utils";
import MapContainer from "../components/MapContainer";
import NavBar from "../components/NavBar";
import PopUp from "../components/PopUp";

function Locations() {
  const [locations, setLocations] = useState([]);
  const [current, setCurrent] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const [origin, setOrigin] = useState({});
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    getLocations();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        localStorage.setItem("origin", JSON.stringify(pos));
        // console.log(pos);
        setOrigin(pos);
      });
    }
  }, []);

  const duringPopUp = popUp ? " during-popup" : "";

  const getLocations = async () => {
    await fetch("https://my.api.mockaroo.com/locations.json?key=a45f1200")
      .then((res) => res.json())
      .then((data) => {
        // console.log(new Date());
        // console.log(data);
        setLocations(data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const setDirection = (e, location) => {
    e.preventDefault();
    localStorage.setItem("savedLocation", JSON.stringify(location));
    window.location.href = "/directions";
  };

  const setInfo = (e, location) => {
    e.preventDefault();
    localStorage.setItem("savedLocation", JSON.stringify(location));
    setPopUp(true);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-12" style={{ paddingLeft: "3%" }}>
            <h2>Found {locations.length} Taco Trucks in 92121</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="main-div">
              {locations.map((location) => {
                return (
                  <div
                    className="card mb-3"
                    key={location.id}
                    onClick={() => setCurrent(location)}
                  >
                    <div className="card-body">
                      <p>
                        <span style={{ fontSize: "20px" }}>
                          {" "}
                          Taco Truck {location.id}
                        </span>

                        <span style={{ float: "right" }}>
                          {getDistance(origin, {
                            lat: location.latitude,
                            lng: location.longitude,
                          })}
                          {"miles"}
                        </span>
                      </p>

                      <p>
                        <small>{location.address}</small>
                        <br />
                        <small>
                          {location.city}, {location.state}{" "}
                          {location.postal_code}
                        </small>
                      </p>

                      <p style={{ color: "teal" }}>
                        {"Open today until " + location[dayOptions[currentDay]]}
                      </p>
                      <p style={{ color: "#F9980D" }}>
                        <img
                          width={"20px"}
                          src={require("../assets/phone-icon.png")}
                        />{" "}
                        {genNumber(3) + "-" + genNumber(3) + "-" + genNumber(4)}
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <button
                            type="button"
                            className="btn btn-secondary location-btns"
                            onClick={(e) => setDirection(e, location)}
                          >
                            DIRECTIONS
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button
                            type="button"
                            className="btn btn-secondary location-btns"
                            onClick={(e) => setInfo(e, location)}
                          >
                            MORE INFO
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {current === null ? (
            <>
              <div className="col-md-6 empty-map map">
                <p>Click a location card to load the map</p>
              </div>
              {popUp ? (
                <div className={duringPopUp}>
                  {popUp && <PopUp setPopUp={setPopUp} location={current} />}
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <div className="col-md-6 map">
                <MapContainer
                  lat={current.latitude}
                  lng={current.longitude}
                  city={current.city}
                  fullSize={false}
                />
              </div>
              {popUp ? (
                <div className={duringPopUp}>
                  {popUp && <PopUp setPopUp={setPopUp} />}
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Locations;
