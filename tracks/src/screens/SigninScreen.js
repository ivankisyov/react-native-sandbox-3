import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

const SigninScreen = () => {
  const { state, signin, clearErrorMewssage } = useContext(AuthContext);

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
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        text="Don't have an account? Sign up instead"
        routeName="Signup"
      />
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

export default SigninScreen;
