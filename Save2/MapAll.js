import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import * as d3 from "d3";

const Map = () => {
  const [locations, setLocations] = useState([]);
  const [locations2, setLocations2] = useState([]);

  useEffect(() => {
    d3.csv("/lat_lng_vdp.csv").then((data) => {
      setLocations(data);
    });
    d3.csv("/lat_lng_vdc.csv").then((data) => {
      setLocations2(data);
    });
  }, []);

  const containerStyle = {
    width: "870px",
    height: "700px",
  };

  const center = {
    lat: 13.736717,
    lng: 100.523186,
  };

  function initMap() {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 9,
      center: center,
    });
    setMarkersVDP(map);
    setMarkersVDC(map);
  }

  function setMarkersVDP(map) {
    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: "poly",
    };

    locations.forEach((location) => {
      const { device, lat, lng, zIndex } = location;

      new window.google.maps.Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(lng) },
        map,
        shape: shape,
        title: device,
        zIndex: parseInt(zIndex),
        icon: {
          url: "/pin_vdp.png", 
          scaledSize: new window.google.maps.Size(15, 15),
        },
      });
    });
  }

  function setMarkersVDC(map) {
    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: "poly",
    };

    locations2.forEach((location) => {
      const { device, lat, lng, zIndex } = location;

      new window.google.maps.Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(lng) },
        map,
        shape: shape,
        title: device,
        zIndex: parseInt(zIndex),
        icon: {
          url: "/pin_vdc.png", 
          scaledSize: new window.google.maps.Size(15, 15),
        },
      });
    });
  }

  return (
    <div>
      <div id="map" style={containerStyle}>
        <LoadScript googleMapsApiKey="AIzaSyC7o7ZcK-nsg9TLZIptgkRlQP8oqLugQXk">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
            onLoad={initMap}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
      <br />
      <div className="MapInfo">
        <div className="Img">
          <img src="/pin_vdc.png" id="Img2" alt="VDC" />{" "}
          <h5>VDC (ตู้เติมสบาย)</h5>
        </div>
        <div className="Img">
          <img src="/pin_vdp.png" id="Img2" alt="VDP" /> <h5>VDP (ตู้ขนม)</h5>
        </div>
      </div><br />
      <h3>source of data: datamart</h3>
    </div>
  );
};

export default Map;
