import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "https://b87e-2a01-5a8-32d-8c07-50d4-5bc0-3197-f6b2.ngrok-free.app",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    // console.log(err);
    return Promise.reject(err);
  }
);

export default instance;
