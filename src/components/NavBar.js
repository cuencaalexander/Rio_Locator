import React from "react";

const NavBar = () => {
  return (
    <nav
      className="nav nav-pills nav-justified"
      style={{ marginRight: "15%", marginLeft: "15%" }}
    >
      <a className="nav-link " href="#">
        <img src={require("../assets/rioseo-logo.png")} />
      </a>
      <a className="nav-link" href="#" style={{ visibility: "hidden" }}>
        Link
      </a>
      <a
        className="nav-link disabled"
        href="#"
        style={{ visibility: "hidden" }}
      >
        Disabled
      </a>

      <a className="nav-link disabled" href="#">
        Menu
      </a>
      <a className="nav-link disabled" href="#">
        {" "}
        <img width={"15px"} src={require("../assets/location-icon.png")} />{" "}
        Truck Locator
      </a>
    </nav>
  );
};
export default NavBar;
