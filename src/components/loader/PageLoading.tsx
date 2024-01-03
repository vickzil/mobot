import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { scale } from "react-native-size-matters";
import { RootState } from "@/store/store";

const PageLoading = () => {
  const { height, width } = Dimensions.get("screen");
  const { loadingModal: loading } = useSelector(
    (state: RootState) => state.alert
  );
  const { darkMode } = useSelector((state: RootState) => state.oauth);

  return (
    <Modal
      transparent
      visible={loading?.status}
      animationType="fade"
      statusBarTranslucent
    >
      <View
        style={[
          styles.container,
          {
            height,
            width,
            backgroundColor: darkMode
              ? "rgba(0,0,0,0.9)"
              : "rgba(225,225,225,0.8)",
            zIndex: 100000,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            position: "relative",
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={[styles.loader]}>
            <View style={{ marginBottom: scale(-25), position: "relative" }}>
              <View
                style={{
                  backgroundColor: "#444",
                  paddingHorizontal: scale(10),
                  paddingVertical: scale(10),
                  borderRadius: 10,
                }}
              >
                <ActivityIndicator size="large" color="#fff" />
              </View>
            </View>
            {loading?.message ? (
              <View style={{ marginTop: scale(30), paddingLeft: scale(10) }}>
                <Text
                  style={[
                    {
                      fontSize: scale(15),
                      fontWeight: "600",
                      color: darkMode ? "#fff" : "#333",
                      fontFamily: "Poppins",
                    },
                  ]}
                >
                  {loading.message}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PageLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: 1000,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    elevation: 1,
    textAlign: "center",
  },
});
