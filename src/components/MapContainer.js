import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { apiKey } from "../utils";

const mapStyles = {
  width: "40%",
  height: "100%",
};
const mapStylesFull = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false, // Hides or shows the InfoWindow
      activeMarker: {}, // Shows the active marker upon click
      selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
      ownPosition: {},
    };
  }

  componentDidMount() {
    const pos = JSON.parse(localStorage.getItem("origin"));
    this.setState({ ownPosition: pos });
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    const { google, lat, lng, city, fullSize } = this.props;
    const {
      activeMarker,
      showingInfoWindow,
      selectedPlace,
      ownPosition,
    } = this.state;
    return (
      <Map
        google={google}
        zoom={5}
        style={fullSize ? mapStylesFull : mapStyles}
        initialCenter={{
          lat,
          lng,
        }}
      >
        <Marker position={{ lat: ownPosition.lat, lng: ownPosition.lng }} />

        <Marker onClick={this.onMarkerClick} name={city} />
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey,
})(MapContainer);
