import { LoadingType, ToastType } from "@/types/alertTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingModal: <LoadingType>{
    status: false,
    message: "Please wait...",
  },

  toastModal: <ToastType>{
    status: false,
    type: "",
    message: "",
  },
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setLoadingModal: (state, { payload }) => {
      state.loadingModal = payload;
    },

    setToastModal: (state, { payload }) => {
      state.toastModal = payload;
    },
  },
});

export const { setLoadingModal, setToastModal } = alertSlice.actions;

export default alertSlice.reducer;
