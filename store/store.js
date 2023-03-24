import { configureStore } from "@reduxjs/toolkit";
import photoSlice from "./photoSlice";

const store = configureStore({
  reducer: { photoList: photoSlice },
});

export default store;
