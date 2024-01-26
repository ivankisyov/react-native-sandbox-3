import React, { useContext } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View>
        <Text style={{ fontSize: 48 }}>AccountScreen</Text>
        <Spacer>
          <Button title="Sign Out" onPress={signout} />
        </Spacer>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
