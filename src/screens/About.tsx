import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import CustomStatusBar from "@/components/custom/CustomStatusBar";
import HeaderBack from "@/components/header/HeaderBack";
import ThemeContext from "@/themes/themeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigations/ScreenStack";
import { scale } from "react-native-size-matters";
import Animated, { FadeInDown } from "react-native-reanimated";
import Logo from "@/components/custom/Logo";
import colors from "@/styles/colors";
import * as Linking from "expo-linking";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setLoadingModal } from "@/store/alertSlice/alertSlice";

const About = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useContext(ThemeContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const arrayList = [
    "In-depth Information about your favorite movies, actors and filmmakers",
    "Details - An entire section devoted to preview details of a particular movie",
    "Explore movies by genre",
  ];

  const gotoWebAddress = () => {
    dispatch(
      setLoadingModal({
        status: true,
        message: "Please wait ...",
      })
    );

    setTimeout(() => {
      dispatch(
        setLoadingModal({
          status: false,
          message: "",
        })
      );
      Linking.openURL("https://victornwakwue.netlify.app/");
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme?.background }}>
      <CustomStatusBar />
      <HeaderBack
        title={"About Mobot"}
        handleClose={() => navigation.goBack()}
        hasMenu={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            paddingTop: scale(20),
            paddingBottom: scale(100),
            paddingHorizontal: scale(20),
          },
        ]}
      >
        <Animated.View
          entering={FadeInDown.delay(300)}
          style={{
            marginTop: scale(10),
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: theme?.color,
              fontSize: scale(24),
              marginTop: scale(-2),
              fontFamily: "Poppins",
            }}
          >
            Welcome to{" "}
          </Text>
          <Logo />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(500)}
          style={{
            marginTop: scale(10),
          }}
        >
          <Text
            style={{
              color: theme?.color,
              fontSize: scale(14),
              fontFamily: "PoppinsLight",
              lineHeight: scale(20),
            }}
          >
            Mobot is a movie search application built with react native. Mobot
            is also a comprehensive and in-depth resource for finding out more
            about the movies, actors and filmmakers you love.
          </Text>
          <Text
            style={{
              color: theme?.color,
              fontSize: scale(17),
              fontFamily: "PoppinsBold",
              lineHeight: scale(20),
              marginTop: scale(18),
            }}
          >
            On Mobot you'll find:
          </Text>

          <View style={{ marginTop: scale(10) }}>
            {arrayList?.map((item, index) => (
              <Text
                key={index}
                style={{
                  color: theme?.color,
                  fontSize: scale(14),
                  fontFamily: "PoppinsLight",
                  lineHeight: scale(20),
                  marginBottom: scale(10),
                }}
              >{`\u2022 ${item}`}</Text>
            ))}
          </View>

          <View style={{ marginTop: scale(40) }}>
            <Text
              style={{
                color: theme?.color,
                fontSize: scale(14),
                fontFamily: "PoppinsLight",
                lineHeight: scale(20),
                textAlign: "center",
              }}
            >
              Developed By{" "}
              <Text
                style={{ color: colors.PRIMARY.yellow }}
                onPress={() => gotoWebAddress()}
              >
                Victor Nwakwue
              </Text>
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({});
