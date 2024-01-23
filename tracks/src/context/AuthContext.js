import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../helpers/navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      // return { ...state, errorMessage: action.payload };
      return { ...state, errorMessage: action.payload };
    case "signup":
      // return { errorMessage: "", token: action.payload };
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      // return { ...state, errorMessage: "" };
      return { ...state, errorMessage: "" };
    case "signout":
      // return { token: null, errorMessage: "" };
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    // make api request to sign up with that email and password
    // if we sign up, modify our state, and say that we are authenticated
    // if signing up fails, we probably need to reflect an error message somewhere

    try {
      const response = await trackerApi.post("/signup", { email, password });
      console.log(">>>200");
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signup", payload: response.data.token });
      navigate("MainFlow");
    } catch (error) {
      console.log(">>>error");
      console.log(error);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    // Try to signin
    // Handle success by updating state
    // Handle failure by showing error message (somehow)
  };
};

const signout = (dispatch) => {
  return () => {
    // somehow sign out!!!
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup },
  { isSignedIn: false, errorMessage: "", token: null }
);
