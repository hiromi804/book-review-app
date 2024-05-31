import { configureStore } from "@reduxjs/toolkit";
import { pagenateSlice } from "./pagenateSlice";
import { userNameSlice } from "./userNameSlice";

export const store = configureStore({
  reducer: {
    page: pagenateSlice.reducer,
    name: userNameSlice.reducer,
  },
});
