import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { useFocusEffect } from "@react-navigation/native";

const SignupScreen = () => {
  const { state, signup, clearErrorMewssage } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearErrorMewssage();
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />

      <NavLink text="Already have an account? Sign in" routeName="Signin" />
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
