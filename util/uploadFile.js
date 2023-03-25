import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";

const uploadFile = async (uri) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, `images/${Math.random()}`);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.log("Did not upload to storage " + error);
  }
};

export default uploadFile;
