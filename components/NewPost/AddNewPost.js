import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import FormikPostUploader from "./FormikPostUploader";

const AddNewPost = () => {
  return (
    <View style={styles.container}>
      <Header />
      <FormikPostUploader />
    </View>
  );
};

const Header = () => (
  <View style={styles.headerContainer}>
    <View style={styles.headerButtonContainer}>
      <Pressable style={({ pressed }) => (pressed ? { opacity: 0.75 } : null)}>
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

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
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
