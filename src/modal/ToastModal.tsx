import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scale } from "react-native-size-matters";
import Animated, { FadeInUp } from "react-native-reanimated";
import { AppDispatch, RootState } from "@/store/store";
import { setToastModal } from "@/store/alertSlice/alertSlice";

const ToastModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toastModal } = useSelector((state: RootState) => state.alert);

  const closePopUp = () => {
    dispatch(
      setToastModal({
        status: false,
        type: "",
        message: "",
      })
    );
  };

  useEffect(() => {
    if (toastModal?.status) {
      setTimeout(() => {
        closePopUp();
      }, 2400);
    }
  }, [toastModal]);

  return (
    toastModal?.status && (
      <Animated.View
        entering={FadeInUp.delay(200)}
        style={[styles.defaultStyle]}
      >
        <TouchableOpacity
          style={[
            styles.containerStyle,
            styles.shadowStyle,
            toastModal?.type === "SUCCESS"
              ? { backgroundColor: "#09b743" }
              : null,
            toastModal?.type === "FAILED"
              ? { backgroundColor: "#f41818" }
              : null,
          ]}
          activeOpacity={0.7}
        >
          <Text style={styles.textStyle}>{toastModal?.message}</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  );
};

let styles = StyleSheet.create({
  defaultStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: scale(60),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000000,
  },
  containerStyle: {
    padding: scale(5),
    backgroundColor: "#000",
    opacity: 0.9,
    borderRadius: 5,
  },
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  textStyle: {
    fontSize: scale(13),
    color: "#fff",
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
});

export default ToastModal;
