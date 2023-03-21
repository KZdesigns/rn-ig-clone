import { Button, Image, Text, TextInput, View, Pressable } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getStorage } from "firebase/storage";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().required("Select a photo."),
  caption: Yup.string().max(2200, "Caption has reached the character limit."),
});

const PlaceHolderImage = "https://img.icons8.com/ios/256/FFFFFF/image.png";

const FormikPostUploader = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PlaceHolderImage);
  const [pickedImage, setPickedImage] = useState();

  const pickImage = async (handleChange) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange(result.assets[0].uri);
      setThumbnailUrl(result.assets[0].uri);
      setPickedImage({ uri: result.assets[0].uri });
    }
  };

  const submitHandler = async () => {
    try {
      const response = await fetch(pickedImage.uri);
      const blob = await response.blob();
      const storage = getStorage();
      const storageRef = ref(storage, `images/${Math.random()}`);
      const snapshot = await uploadBytes(storageRef, blob);
      alert("Your post has been uploaded!");
      setThumbnailUrl(PlaceHolderImage);
    } catch (error) {
      alert("There was an error try again!");
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={submitHandler}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 10,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "row",
            }}
          >
            <Pressable
              onPress={() => {
                pickImage(handleChange("imageUrl"));
              }}
            >
              <Image
                source={{ uri: thumbnailUrl ? thumbnailUrl : PlaceHolderImage }}
                style={{ width: 100, height: 100, marginHorizontal: 10 }}
              />
            </Pressable>
            <TextInput
              style={{ color: "white", fontSize: 20, marginTop: 12 }}
              placeholder="Write a caption"
              placeholderTextColor="gray"
              multiline={true}
              onChangeText={handleChange("caption")}
              onBlur={handleBlur("caption")}
              value={values.caption}
            />
          </View>

          <Divider width={0.2} orientation="horizontal" />
          <Button
            onPress={handleSubmit}
            title="Share"
            disabled={!isValid}
          ></Button>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {errors.imageUrl && (
              <Text style={{ fontSize: 15, color: "red" }}>
                {errors.imageUrl}
              </Text>
            )}
          </View>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
