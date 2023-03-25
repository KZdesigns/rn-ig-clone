import { saveFile } from "./photoSlice";
import getDatabaseObj from "../util/getDatabaseObj";

export const fetchPhotoListData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const data = await getDatabaseObj();
      const dataArray = [data];
      const imageUrls = dataArray.map((item) => {
        const key = Object.keys(item)[0];
        return item[key].imageUri;
      });
      console.log(imageUrls);
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
