import { createSlice } from "@reduxjs/toolkit";

export const photoSlice = createSlice({
  name: "photoList",
  initialState: {
    photos: [],
  },
  reducers: {
    saveFile(state, action) {
      action.payload.imageUrls.forEach((element) => {
        if (!state.photos.includes(element)) {
          state.photos.push(element);
        }
      });
    },
  },
});

export const { saveFile } = photoSlice.actions;
export default photoSlice.reducer;
