import { saveFile } from "./photoSlice";
import getDatabaseObj from "../util/getDatabaseObj";

export const fetchPhotoListData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const data = await getDatabaseObj();
      const dataKeys = Object.keys(data);
      // const dataArray = [data];

      const imageUrls = dataKeys.map((key, index) => {
        return data[key].imageUri;
      });
      return imageUrls;
    };

    try {
      const photoData = await fetchData();
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
