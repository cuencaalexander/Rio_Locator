import React from "react";
import {
  currentDay,
  dayOptionsFull,
  daysArr,
  dayOptionsReversed,
  genNumber,
} from "../utils";
import "./PopUp.css";

const PopUp = (props) => {
  // function that takes boolean as param to conditionally display popup
  const { setPopUp } = props;

  const location = JSON.parse(localStorage.getItem("savedLocation"));
  console.log(location);

  return (
    <div className="PopUp">
      <span style={{ float: "right" }}>
        <button className="popup-x" onClick={() => setPopUp(false)}>
          X
        </button>
      </span>

      <div className="pu-content-container">
        <h1>
          <img height={"50%"} src={require("../assets/img.PNG")} />
        </h1>
        <p>
          <span style={{ fontSize: "20px" }}> Taco Truck {location.id}</span>
        </p>

        <p>
          <small>{location.address}</small>
          <br />
          <small>
            {location.city}, {location.state} {location.postal_code}
          </small>
        </p>

        <p style={{ color: "#F9980D" }}>
          {" "}
          <span>
            <img width={"20px"} src={require("../assets/phone-icon.png")} />{" "}
            {genNumber(3) + "-" + genNumber(3) + "-" + genNumber(4)}
          </span>
          <span style={{ float: "right" }}>
            <img width={"20px"} src={require("../assets/direction-icon.png")} />{" "}
            {"Get directions"}
          </span>
        </p>

        {daysArr.map((day, index) => {
          console.log(day);
          return dayOptionsReversed[day] === dayOptionsFull[currentDay] ? (
            <div className="row" key={index}>
              <div className="col-5">
                <b> {dayOptionsReversed[day]}</b>
              </div>
              <div className="col-7">
                <b>
                  {" "}
                  {location[day.slice(0, -5) + "open"] + " - " + location[day]}
                </b>
              </div>
              {/* <div className="col-3">
                <b> {location[day]}</b>
              </div> */}
            </div>
          ) : (
            <div className="row" key={index}>
              <div className="col-5">
                <span> {dayOptionsReversed[day]}</span>
              </div>
              <div className="col-7">
                <span>
                  {" "}
                  {location[day.slice(0, -5) + "open"] + " - " + location[day]}
                </span>
              </div>
              {/* <div className="col-3">
                <span> {location[day]}</span>
              </div> */}
            </div>
          );
        })}
      </div>

      <a
        href={location.url}
        target={"_blank"}
        type="button"
        className="btn btn-secondary location-btns"
      >
        VIEW FULL DETAILS
      </a>
      <br />
    </div>
  );
};

export default PopUp;
