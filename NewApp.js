import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/HomeScreen";
import NewPostScreen from "./screens/NewPostScreen";
import { storage } from "./util/firebaseConfig";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store/store";
import PhotoScreen from "./screens/PhotoScreen";
import NewPostForm from "./components/NewPostTest/NewPostForm";
import ShowPhoto from "./screens/ShowPhoto";
import { fetchPhotoListData } from "./store/photoActions";
import { useDispatch, useSelector } from "react-redux";

const Stack = createStackNavigator();

export default function NewApp() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPhotoListData());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="test-form" component={NewPostForm} />
        {/*<Stack.Screen name="show-photos" component={ShowPhoto} /> */}
        <Stack.Screen name="test" component={PhotoScreen} />
        {/* <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="New_Post_Screen" component={NewPostScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
