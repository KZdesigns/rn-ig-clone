import React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Home/Header";
import Post from "../components/Home/Post";
import Stories from "../components/Home/Stories";
import { POSTS } from "../data/post";
import Constants from "expo-constants";
import BottomTabs from "../components/Home/BottomTabs";

// Notes for building safe area add padding around all edges this means views willl not stretch all the way left and right

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stories />
      <ScrollView>
        {POSTS.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});

export default HomeScreen;
