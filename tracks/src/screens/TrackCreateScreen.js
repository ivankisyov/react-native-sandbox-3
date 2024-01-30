import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Text, Input } from "react-native-elements";
import Map from "../components/Map";
import { useIsFocused } from "@react-navigation/native";
import "../mocks/_mockLocation";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";

const TrackCreateScreen = () => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);
  const isFocused = useIsFocused();
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording] // this is the dependency array
  );
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text h2>Create a track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;
