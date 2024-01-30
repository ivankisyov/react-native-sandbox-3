import { useState, useEffect } from "react";
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    let subscriber;

    // declare any helper functions which use
    // state variables inside the useEffect hook
    // that way you can easily detect what
    // needs to be added to the dependency array
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
          throw new Error("Location permission not granted");
        }
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          (location) => {
            callback(location);
          }
        );
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }

    // this is the cleanup function that will be called when the component is about to be removed from the screen (unmounted) and when the value of shouldTrack changes
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    };
  }, [shouldTrack, callback]); // this is the dependency array that will be called when the component is first rendered and when the component is about to be removed from the screen (unmounted) and when the value of shouldTrack changes

  return [err];
};
