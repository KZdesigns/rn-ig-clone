import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Divider } from "react-native-elements";
import { PostFooterIcons } from "../../assets/post-footer-icons";

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} />
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
        {post.user}
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

const PostFooter = () => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={styles.leftFooterIconsContainer}>
      <Icon
        imageStyle={styles.footerIcon}
        imageUrl={PostFooterIcons[0].imageUrl}
      />
      <Icon
        imageStyle={styles.footerIcon}
        imageUrl={PostFooterIcons[1].imageUrl}
      />
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
      {post.likes.toLocaleString("en")} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text>
      <Text style={{ color: "white", fontWeight: "bold", marginRight: 4 }}>
        {post.user}
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
