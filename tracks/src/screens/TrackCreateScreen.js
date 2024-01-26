import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Text, Input } from "react-native-elements";
import Map from "../components/Map";

const TrackCreateScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text h2>Create a track</Text>
      <Map />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;
