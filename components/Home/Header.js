import { Text, View, Image, StyleSheet, Pressable } from "react-native";

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable style={({ pressed }) => (pressed ? styles.logoPressed : null)}>
        <Image
          style={styles.logo}
          source={require("../../assets/header-logo.png")}
        />
      </Pressable>
      <View style={styles.iconsContainer}>
        <Pressable
          style={({ pressed }) => (pressed ? styles.logoPressed : null)}
          onPress={() => navigation.push("NewPostScreen")}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png",
            }}
            style={styles.icon}
          />
        </Pressable>

        <Pressable
          style={({ pressed }) => (pressed ? styles.logoPressed : null)}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
            }}
            style={styles.icon}
          />
        </Pressable>

        <Pressable
          style={({ pressed }) => (pressed ? styles.logoPressed : null)}
        >
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png",
            }}
            style={styles.icon}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  logoPressed: {
    opacity: 0.5,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "contain",
  },
  unreadBadge: {
    backgroundColor: "#FF3250",
    position: "absolute", // want to be able to put this wherever we want
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100, // brings things to the top
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Header;
