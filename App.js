import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import NewPostScreen from "./screens/NewPostScreen";
import { storage } from "./util/firebaseConfig";

export default function App() {
  return <NewPostScreen />;
}
