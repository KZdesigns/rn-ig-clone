import React, { useState } from "react";
import { View, Pressable, StyleSheet, Image } from "react-native";
import { bottomTabIcons } from "../../assets/bottomTabIcons";
import { Divider } from "react-native-elements";

const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const activeTabHanlder = (name) => {
    setActiveTab(name);
  };

  return (
    <View style={{ zIndex: 100 }}>
      <Divider width={1} orientation="vertical" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        {bottomTabIcons.map((icon, index) => (
          <Icon
            icon={icon}
            key={index}
            onPress={activeTabHanlder}
            activeTab={activeTab}
          />
        ))}
      </View>
    </View>
  );
};

const Icon = ({ icon, onPress, activeTab }) => {
  let imgUrl = icon.inactive;

  if (icon.name === activeTab) {
    imgUrl = icon.active;
  }

  const onPressHandler = () => {
    onPress(icon.name);
  };

  return (
    <View style={{ padding: 10 }}>
      <Pressable
        style={({ pressed }) => (pressed ? styles.IconPressed : null)}
        onPress={onPressHandler}
      >
        <Image
          source={{ uri: imgUrl }}
          style={[
            { height: 35, width: 35, borderRadius: 50 },
            icon.name === "Profile" ? styles.profilePic(activeTab) : null,
          ]}
        />
      </Pressable>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  IconPressed: {
    opacity: 0.75,
  },
  profilePic: (activeTab = "") => ({
    borderColor: "white",
    borderWidth: activeTab === "Profile" ? 2 : 0,
  }),
});
