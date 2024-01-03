import { Providers } from "@/store/provider";
import { useFonts } from "expo-font";
import { RootSiblingParent } from "react-native-root-siblings";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigation from "@/navigations";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [loaded] = useFonts({
    Poppins: require("@/assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("@/assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("@/assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("@/assets/fonts/Poppins-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <Providers>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <MainNavigation />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </Providers>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
