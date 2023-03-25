import axios from "axios";

const uploadObj = async (data) => {
  try {
    await axios.post(
      "https://react-native-app-a74a5-default-rtdb.firebaseio.com/images.json",
      data
    );
  } catch (error) {
    console.log("Did not upload to realtime database " + error);
  }
};

export default uploadObj;
