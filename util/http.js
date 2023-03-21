import axios from "axios";

const BACKEND_URL =
  "https://react-native-app-a74a5-default-rtdb.firebaseio.com";

export function storePhoto(photoData) {
  axios.post(BACKEND_URL + "/photo.json", photoData);
}

export async function fetchPhoto() {
  const response = await axios.get(BACKEND_URL + "/photo.json");

  const photos = [];

  for (const key in response.data) {
    const photoObj = {
      id: key,
      caption: response.data[key].caption,
      imageUrl: response.data[key].imageUrl,
    };
    photos.push(photoObj);
  }
  return photos;
}
