import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailsScreen from "./src/screens/TrackDetailsScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import AccountScreen from "./src/screens/AccountScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { navigationRef } from "./src/helpers/navigationRef";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const LoginFlow = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ResolveAuth"
      component={ResolveAuthScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signin"
      component={SigninScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const TrackFlow = () => (
  <Stack.Navigator>
    <Stack.Screen name="TrackList" component={TrackListScreen} />
    <Stack.Screen name="TrackDetails" component={TrackDetailsScreen} />
  </Stack.Navigator>
);

const MainFlow = () => (
  <Tab.Navigator>
    <Tab.Screen name="TrackFlow" component={TrackFlow} />
    <Tab.Screen name="TrackCreate" component={TrackCreateScreen} />
    <Tab.Screen name="Account" component={AccountScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginFlow"
          component={LoginFlow}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainFlow"
          component={MainFlow}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
