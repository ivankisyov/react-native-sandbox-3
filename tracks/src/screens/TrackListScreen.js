import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TrackListScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={{ fontSize: 48 }}>TrackListScreen</Text>
      <Button
        title="Go to Track Details"
        onPress={() => navigation.navigate("TrackDetails")}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
