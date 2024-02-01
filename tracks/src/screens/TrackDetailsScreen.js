import React, { useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

const TrackDetails = () => {
  const route = useRoute();
  const { _id } = route.params;
  const { state } = useContext(TrackContext);
  const track = state.find((t) => t._id === _id);

  return (
    <>
      <Text style={{ fontSize: 48 }}>{track.name}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          ...track.locations[0].coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline
          coordinates={track.locations.map((loc) => loc.coords)}
          strokeWidth={5}
        />
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default TrackDetails;
