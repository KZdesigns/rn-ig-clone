import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

const NewComment = ({ navigation, post }) => {
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
    {post.comments.map((comment, index) => (
      <View
        key={index}
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
  const navigation = useNavigation();

  const getUserName = async () => {
    try {
      const user = auth.currentUser;
      const q = query(
        collection(db, "users"),
        where("owner_uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.at(0).get("username");
    } catch (error) {
      console.log(error);
    }
  };

  const onAddComment = async (post, text, navigation) => {
    if (
      text != "" ||
      text != `Add a comment for ${post.username}` ||
      text != null
    ) {
      const ref = doc(db, "users", post.owner_email, "posts", post.id);
      const user = await getUserName();
      console.log(user);
      const comment = {
        user: user,
        comment: text,
      };
      try {
        await updateDoc(ref, {
          comments: arrayUnion(comment),
        });
        navigation.navigate("HomeScreen");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

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
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={{ padding: 20 }}
          onChangeText={onChangeText}
          value={text}
        />
        <Pressable
          onPress={() => onAddComment(post, text, navigation)}
          style={{ padding: 20 }}
        >
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
