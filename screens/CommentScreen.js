import { SafeAreaView } from "react-native";
import NewComment from "../components/Comments/NewComment";

const CommentScreen = ({ navigation, route }) => {
  const post = route.params.post;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NewComment navigation={navigation} post={post} />
    </SafeAreaView>
  );
};

export default CommentScreen;
