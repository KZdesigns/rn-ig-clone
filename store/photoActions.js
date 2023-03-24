import { ref, getStorage, getDownloadURL, listAll } from "firebase/storage";
import { saveFile } from "./photoSlice";

export const fetchPhotoListData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const storage = getStorage();
      const listRef = ref(storage, "images/");
      const imageObj = await listAll(listRef);

      const imageUrls = await Promise.all(
        imageObj.items.map(async (item) => {
          const url = await getDownloadURL(ref(storage, item.fullPath));
          return url;
        })
      );
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
      console.log(`${error}`);
    }
  };
};
