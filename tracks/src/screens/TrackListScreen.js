import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";

const TrackListScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { state, fetchTracks } = React.useContext(TrackContext);

  React.useEffect(() => {
    if (isFocused) {
      fetchTracks();
    }
  }, [isFocused]);

  return (
    <View>
      <Text
        style={{
          fontSize: 48,
          marginTop: 50,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Tracks
      </Text>
      {state.length ? (
        <FlatList
          data={state}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("TrackDetails", { _id: item._id })
                }
              >
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
            );
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
