import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = () => {
  const { state, signup } = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Sign Up for Tracker</Text>
      </Spacer>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      {state.errorMessage ? (
        <Text style={{ color: "red" }}>{state.errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title="Sign Up"
          onPress={() => {
            signup({ email, password });
          }}
        />
      </Spacer>
      <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
        <Spacer>
          <Text style={{ color: "blue" }}>
            Already have an account? Sign in
          </Text>
        </Spacer>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // marginBottom: 250,
  },
});

export default SignupScreen;
