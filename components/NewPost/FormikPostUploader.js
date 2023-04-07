import {
  Alert,
  Button,
  Image,
  StyleSheet,
  TextInput,
  View,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().required("A url is required."),
  caption: Yup.string().max(2200, "Caption has reached the character limit."),
});

const PlaceHolderImage = "https://img.icons8.com/ios/256/FFFFFF/image.png";

const FormikPostUploader = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PlaceHolderImage);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [pickedImage, setPickedImage] = useState(null);
  const navigation = useNavigation();

  //set the currentUserState
  const getUserName = async () => {
    try {
      const user = auth.currentUser;
      const q = query(
        collection(db, "users"),
        where("owner_uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCurrentLoggedInUser({
          username: doc.get("username"),
          profile_picture: doc.get("profile_picture"),
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  //this is going to set the get the current user
  useEffect(() => {
    getUserName();
  }, []);

  //this send the image to the firestore
  const saveImageInFireStore = async (storageRef) => {
    try {
      const response = await fetch(pickedImage.uri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      alert("Your post has been uploaded!");
      setThumbnailUrl(PlaceHolderImage);
    } catch (error) {
      alert("There was an error try again!");
      console.log(error);
    }
  };

  const getUrlFromFireStore = async (storageRef) => {
    const fireStoreImageUrl = await getDownloadURL(storageRef);
    return fireStoreImageUrl;
  };

  //this will need to upload the data to firestore
  const uploadPostToFirebase = async (imageUrl, caption) => {
    const data = {
      imageUrl: imageUrl,
      username: currentLoggedInUser.username,
      profile_picture: currentLoggedInUser.profile_picture,
      owner_uid: auth.currentUser.uid,
      owner_email: auth.currentUser.email,
      caption: caption,
      createdAt: new Date(),
      likes_by_users: [],
      comments: [],
    };
    try {
      const userId = auth.currentUser.email;
      const userRef = doc(db, "users", userId);
      const docRef = await addDoc(collection(userRef, "posts"), data);
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert(
        "Try Again",
        "Looks like something went wrong, try to upload the photo again."
      );
    }
  };

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

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={async (values) => {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${Math.random()}`);
        await saveImageInFireStore(storageRef);
        const url = await getUrlFromFireStore(storageRef);
        await uploadPostToFirebase(url, values.caption);
      }}
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
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;

const styles = StyleSheet.create({});
