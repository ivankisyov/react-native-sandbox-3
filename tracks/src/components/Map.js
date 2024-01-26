import React from "react";
import { Text, Input, Button } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import MapView, { Polyline } from "react-native-maps";

const Map = () => {
  let mockedPoints = [];
  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) {
      mockedPoints.push({
        latitude: 41.5760384 + i * 0.001,
        longitude: 24.772608 + i * 0.001,
      });
    } else {
      mockedPoints.push({
        latitude: 41.5760384 - i * 0.002,
        longitude: 24.772608 + i * 0.001,
      });
    }
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 41.5760384,
        longitude: 24.772608,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Polyline coordinates={mockedPoints} />
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
