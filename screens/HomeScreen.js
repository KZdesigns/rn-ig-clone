import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Home/Header";
import Post from "../components/Home/Post";
import Stories from "../components/Home/Stories";
import Constants from "expo-constants";
import BottomTabs from "../components/Home/BottomTabs";
import { db } from "../firebase";
import { collectionGroup, onSnapshot } from "firebase/firestore";
// Notes for building safe area add padding around all edges this means views willl not stretch all the way left and right

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(collectionGroup(db, "posts"), (snapshot) => {
      setPosts(
        snapshot.docs.map((post) => ({
          id: post.id,
          ...post.data(),
        }))
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
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

// id:
//     imageUrl:
//     user:
//     likes_by_users:
//     caption:
//     profile_picture:
//     comments:
