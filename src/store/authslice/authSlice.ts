import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
};

const authSlice = createSlice({
  name: "oauth",
  initialState,
  reducers: {
    setDarkMode: (state, { payload }) => {
      state.darkMode = payload;
    },
  },
});

export const { setDarkMode } = authSlice.actions;

export default authSlice.reducer;
