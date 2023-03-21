// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDESkKiq4if-_PWOUvZ6IwFIynJo8S01UY",
  authDomain: "react-native-app-a74a5.firebaseapp.com",
  databaseURL: "https://react-native-app-a74a5-default-rtdb.firebaseio.com",
  projectId: "react-native-app-a74a5",
  storageBucket: "react-native-app-a74a5.appspot.com",
  messagingSenderId: "484806916727",
  appId: "1:484806916727:web:1a5018656290b71fe1e472",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
