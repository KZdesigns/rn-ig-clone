import axios from "axios";

const getDatabaseObj = async () => {
  try {
    const response = await axios.get(
      "https://react-native-app-a74a5-default-rtdb.firebaseio.com/images.json"
    );
    return response.data;
  } catch (error) {
    console.log("There was an error in the getDatabaseObj: " + error);
  }
};

export default getDatabaseObj;
