import React, { useContext } from "react";
import { Text, Input, Button } from "react-native-elements";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  // let mockedPoints = [];
  // for (let i = 0; i < 20; i++) {
  //   if (i % 2 === 0) {
  //     mockedPoints.push({
  //       latitude: 41.5760384 + i * 0.001,
  //       longitude: 24.772608 + i * 0.001,
  //     });
  //   } else {
  //     mockedPoints.push({
  //       latitude: 41.5760384 - i * 0.002,
  //       longitude: 24.772608 + i * 0.001,
  //     });
  //   }
  // }
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);
  const initialLocation = {
    longitude: -122.0312186,
    latitude: 37.33233141,
  };

  // console.log(currentLocation);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...initialLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      // region={{
      //   ...currentLocation.coords,
      //   latitudeDelta: 0.01,
      //   longitudeDelta: 0.01,
      // }}
    >
      {/* <Polyline coordinates={mockedPoints} /> */}
      <Polyline coordinates={locations.map((loc) => loc.coords)} />
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158,158,255,1.0)"
        fillColor="rgba(158,158,255,0.3)"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
  },
});

export default Map;
