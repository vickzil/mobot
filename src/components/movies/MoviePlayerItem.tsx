import "../../../ignoreWarnings";
import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { videoType } from "@/types/movieType";
import { scale } from "react-native-size-matters";
import YoutubePlayer from "react-native-youtube-iframe";
import ThemeContext from "@/themes/themeContext";
import * as ScreenOrientation from "expo-screen-orientation";

type MoviePlayerItemProps = {
  video: videoType;
  index: number;
};

const MoviePlayerItem = ({ video, index }: MoviePlayerItemProps) => {
  const theme = useContext(ThemeContext);

  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const controlRef = useRef<any>(null);

  const onStateChange = (state: string) => {
    if (state === "ended") {
      setPlaying(false);
    }
    if (state !== "playing") {
      setPlaying(false);
    }
  };

  function setOrientation(status: boolean) {
    if (status === true) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }

  useEffect(() => {
    return () => {
      ScreenOrientation.removeOrientationChangeListeners();
    };
  }, []);

  return (
    <View
      style={{
        marginBottom: scale(22),
        paddingHorizontal: scale(15),
        paddingVertical: scale(10),
        paddingBottom: scale(30),
        backgroundColor: theme?.background2,
        borderRadius: 10,
      }}
    >
      <YoutubePlayer
        height={scale(250)}
        ref={controlRef}
        play={playing}
        mute={isMute}
        videoId={video?.key}
        onChangeState={onStateChange}
        onFullScreenChange={setOrientation}
      />

      <Text
        style={{
          textAlign: "center",
          color: theme?.color,
          fontSize: scale(13),
          lineHeight: scale(20),
          fontFamily: "PoppinsBold",
          marginTop: scale(-20),
        }}
      >
        {video?.name}
      </Text>
    </View>
  );
};

export default MoviePlayerItem;

const styles = StyleSheet.create({});
