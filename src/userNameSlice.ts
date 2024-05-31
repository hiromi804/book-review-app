import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
};

export const userNameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.userName = action.payload;
    },
  },
});
export const { setName } = userNameSlice.actions;
