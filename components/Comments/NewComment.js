import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import React, { useState } from "react";

const NewComment = ({ navigation, post }) => {
  console.log(post);
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <CommentsSection post={post} />
      <KeyboardAvoidingView behavior="padding">
        <AddNewCommentForm post={post} />
      </KeyboardAvoidingView>
    </View>
  );
};

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerButtonContainer}>
      <Pressable
        style={({ pressed }) => (pressed ? { opacity: 0.75 } : null)}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={{
            uri: "https://img.icons8.com/ios-glyphs/90/000000/back.png",
          }}
          style={{ height: 30, width: 30 }}
        />
      </Pressable>
    </View>
    <View style={styles.HeaderTextContainer}>
      <Text style={styles.HeaderText}>New Comment</Text>
    </View>
  </View>
);

const CommentsSection = ({ post }) => (
  <ScrollView>
    {post.comments.map((comment) => (
      <View
        style={{
          alignItems: "flex-start",
          padding: 20,
          borderBottomWidth: 0.17,
          borderBottomColor: "black",
        }}
      >
        <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
          {comment.user}{" "}
        </Text>
        <Text style={{ color: "black", fontSize: 14 }}>{comment.comment}</Text>
      </View>
    ))}
  </ScrollView>
);

const AddNewCommentForm = ({ post }) => {
  const [text, onChangeText] = useState(`Add a comment for ${post.username}`);
  return (
    <View
      style={{
        zIndex: 100,
        borderTopColor: "black",
        borderTopWidth: 1.6,
        paddingTop: 30,
        paddingHorizontal: 30,
        marginBottom: 60,
      }}
    >
      <View
        style={{
          borderRadius: 50,
          borderBottomColor: "black",
          borderWidth: 1.6,
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput onChangeText={onChangeText} value={text} />
        <Pressable>
          <Text style={{ color: "gray" }}>post</Text>
        </Pressable>
      </View>
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
    marginBottom: 20,
  },
  headerButtonContainer: {
    flex: 1,
  },
  HeaderTextContainer: {
    flex: 2,
  },
  HeaderText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default NewComment;
