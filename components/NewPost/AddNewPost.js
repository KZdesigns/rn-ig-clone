import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import FormikPostUploader from "./FormikPostUploader";
import { ref, getStorage, getDownloadURL, listAll } from "firebase/storage";

const AddNewPost = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FormikPostUploader />
      <GetPhotos />
    </View>
  );
};

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerButtonContainer}>
      <Pressable
        style={({ pressed }) => (pressed ? { opacity: 0.75 } : null)}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          source={{
            uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png",
          }}
          style={{ height: 30, width: 30 }}
        />
      </Pressable>
    </View>
    <View style={styles.HeaderTextContainer}>
      <Text style={styles.HeaderText}>New Post</Text>
    </View>
  </View>
);

const GetPhotos = () => {
  const [photos, setPhotos] = useState([]);

  const onAllPressHandler = async () => {
    try {
      const storage = getStorage();
      const listRef = ref(storage, "images/");
      const imageObj = await listAll(listRef);
      imageObj.items.forEach(async (item) => {
        const url = await getDownloadURL(ref(storage, item.fullPath));
        setPhotos((prev) => [...prev, { imageUrl: url }]);
      });
    } catch (error) {
      console.log(`There were errors ${error}`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", width: "100%" }}>
      <Button title="get all photos" onPress={onAllPressHandler} />
      <ScrollView style={{ paddingBottom: 80, width: "100%" }}>
        {photos.map((photo, index) => (
          <View key={index}>
            <Image
              source={{ uri: photo.imageUrl }}
              style={{
                width: "100%",
                height: 300,
                margin: 10,
                resizeMode: "cover",
                paddingBottom: 10,
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerButtonContainer: {
    flex: 1,
  },
  HeaderTextContainer: {
    flex: 1.5,
  },
  HeaderText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default AddNewPost;
