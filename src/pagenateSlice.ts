import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 0,
};

export const pagenateSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    increment: (state) => {
      state.currentPage++;
    },
    decrement: (state) => {
      state.currentPage--;
    },
  },
});
export const { increment, decrement } = pagenateSlice.actions;
