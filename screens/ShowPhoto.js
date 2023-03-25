import { View, Text, Button, Image } from "react-native";
import React, { useState } from "react";
import getDatabaseObj from "../util/getDatabaseObj";

const ShowPhoto = ({ navigation }) => {
  const [postList, setPosts] = useState([]);

  const fetchData = async () => {
    const data = await getDatabaseObj();
    setPosts((prevState) => [...prevState, data]);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="upload Photo"
        onPress={() => navigation.navigate("test-form")}
      />
      <Button title="Get Objects" onPress={fetchData} />
      <Text>showPhoto</Text>
      {postList.map((post, index) => {
        const key = Object.keys(post)[0];
        const url = post[key].imageUri;
        return (
          <Image
            key={index}
            source={{ uri: url }}
            style={{ height: 100, width: 100 }}
          />
        );
      })}
    </View>
  );
};

export default ShowPhoto;
