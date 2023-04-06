import { saveFile } from "./photoSlice";
import getDatabaseObj from "../util/getDatabaseObj";
import { getDatabase, ref, onValue } from "firebase/database";

export const fetchPhotoListData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const db = getDatabase();
      const starCountRef = ref(db, "/images");
      const imageUrls = [];
      await Promise.all(
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          const keys = Object.keys(data);
          keys.forEach((element) => {
            imageUrls.push(data[element].imageUri);
          });
        })
      );
      return imageUrls;
    };

    try {
      const photoData = await fetchData();
      console.log(photoData);
      dispatch(
        saveFile({
          imageUrls: photoData,
        })
      );
    } catch (error) {
      console.log(`There was an error in photoAction.js: ${error}`);
    }
  };
};
