import React, { useEffect } from "react";
import { View, Image, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotoListData } from "../store/photoActions";

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
    navigation.navigate("New_Post_Screen");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
