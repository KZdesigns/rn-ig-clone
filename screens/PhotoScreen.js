import React, { useEffect } from "react";
import { View, Image, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotoListData } from "../store/photoActions";
import axios from "axios";

const PhotoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const photoUrlList = useSelector((state) => state.photoList.photos);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(fetchPhotoListData());
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const onPressHandler = () => {
    navigation.navigate("test-form");
  };

  const getDataFromFirebaseHandler = async () => {
    const response = await axios.get(
      "https://react-native-app-a74a5-default-rtdb.firebaseio.com/images.json"
    );
    console.log(response.data);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Get RealTimeDB data"
        onPress={getDataFromFirebaseHandler}
      ></Button>
      <Button title="test" onPress={onPressHandler}></Button>
      {photoUrlList.map((photo, index) => (
        <Image
          key={index}
          source={{ uri: photo }}
          style={{ height: 100, width: 100 }}
        />
      ))}
    </View>
  );
};

export default PhotoScreen;
