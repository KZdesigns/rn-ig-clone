import axios from "axios";

const getDatabaseObj = async () => {
  const response = await axios.get(
    "https://react-native-app-a74a5-default-rtdb.firebaseio.com/images.json"
  );
  return response.data;
};

export default getDatabaseObj;
