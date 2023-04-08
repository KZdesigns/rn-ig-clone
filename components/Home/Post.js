import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Divider } from "react-native-elements";
import { PostFooterIcons } from "../../assets/post-footer-icons";
import { auth, db } from "../../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const Post = ({ post }) => {
  const navigation = useNavigation();
  const navigateToCommentScreen = () => {
    navigation.navigate("CommentScreen", { post });
  };

  const handleLike = async (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      auth.currentUser.email
    );
    try {
      const userId = auth.currentUser.email;
      const userRef = doc(db, "users", post.owner_email, "posts", post.id);
      await updateDoc(userRef, {
        likes_by_users: currentLikeStatus
          ? arrayUnion(userId)
          : arrayRemove(userId),
      });
    } catch (error) {
      console.log("Error in handle like: " + error.message);
    }
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter
          post={post}
          handleLike={handleLike}
          navigation={navigateToCommentScreen}
        />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      alignItems: "center",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profile_picture }} style={styles.story} />
      <Text style={{ color: "white", marginLeft: 5, fontWeight: "bold" }}>
        {post.username}
      </Text>
    </View>
    <Text style={{ color: "white", fontWeight: "bold" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ post, handleLike, navigation }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={styles.leftFooterIconsContainer}>
      <Pressable onPress={() => handleLike(post)}>
        <Image
          style={styles.footerIcon}
          source={{
            uri: post.likes_by_users.includes(auth.currentUser.email)
              ? PostFooterIcons[0].likedImageUrl
              : PostFooterIcons[0].imageUrl,
          }}
        />
      </Pressable>

      <Pressable onPress={navigation}>
        <Image
          style={styles.footerIcon}
          source={{ uri: PostFooterIcons[1].imageUrl }}
        />
      </Pressable>

      <Icon
        imageStyle={styles.footerIcon}
        imageUrl={PostFooterIcons[2].imageUrl}
      />
    </View>
    <View>
      <Icon
        imageStyle={styles.footerIcon}
        imageUrl={PostFooterIcons[3].imageUrl}
      />
    </View>
  </View>
);

const Icon = ({ imageStyle, imageUrl }) => (
  <Pressable style={({ pressed }) => (pressed ? styles.iconPressed : null)}>
    <Image style={imageStyle} source={{ uri: imageUrl }} />
  </Pressable>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "bold" }}>
      {post.likes_by_users.length.toLocaleString("en")} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text>
      <Text style={{ color: "white", fontWeight: "bold", marginRight: 4 }}>
        {post.username}
      </Text>
      <Text style={{ color: "white", marginLeft: 4 }}> {post.caption}</Text>
    </Text>
  </View>
);

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "gray" }}>
        View {post.comments.length > 1 ? "all " : ""}
        {post.comments.length}{" "}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "bold" }}>{comment.user}</Text>{" "}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

export default Post;

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  iconPressed: {
    opacity: 0.5,
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
  },
});
