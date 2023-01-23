import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { InfoWindow } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";

const API_KEY = "AIzaSyBajbbB6_CpV9otJ-qVJzjbjvozUQ96qsI";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const MARKERS_TO_SHOW = [
  {
    position: {
      lat: 13.114030292674546,
      lng: 80.29512124312156,
    },
    text: "this is chennai!",
  },
  {
    position: {
      lat: 12.954822648003772,
      lng: 77.57602696331192,
    },
    text: "hello dostho",
  },
];

export const MyComponent = () => {
  const [view, setView] = React.useState(MARKERS_TO_SHOW[0].position);

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
      <GoogleMap mapContainerStyle={containerStyle} center={view} zoom={10}>
        <Markers markers={MARKERS_TO_SHOW} />
        <MyAutoComplete setView={setView} />
      </GoogleMap>
    </LoadScript>
  );
};

const MyAutoComplete = ({ setView }) => {
  const [autoComplete, setAutoComplete] = React.useState(null);

  const onPlaceChanged = () => {
    if (autoComplete !== null) {
      setView(autoComplete.getPlace().geometry.location);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <Autocomplete
      onLoad={(a) => setAutoComplete(a)}
      onPlaceChanged={onPlaceChanged}
    >
      <input
        type="text"
        placeholder="Gaja daw"
        style={{
          position: "absolute",
          left: "50%",
        }}
      />
    </Autocomplete>
  );
};

const Markers = ({ markers = [] }) => {
  return (
    <>
      {markers.map((marker, i) => (
        <MarkerView key={i} marker={marker} />
      ))}
    </>
  );
};

const MarkerView = ({ marker }) => {
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  const onMarkerClick = () => {
    if (selectedMarker) {
      setSelectedMarker(null);
    } else {
      setSelectedMarker(marker.position);
    }
  };

  return (
    <>
      <Marker position={marker.position} onClick={onMarkerClick} />
      {selectedMarker && (
        <InfoWindow position={marker.position}>
          <div style={{ padding: "10px", border: "1px solid red" }}>
            <h1 style={{ color: "red" }}>{marker.text}</h1>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
