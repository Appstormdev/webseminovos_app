import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, ViewStyle } from "react-native";

export const BackgroundGradientImage = (props: { style?: ViewStyle }) => {
  return (
    <LinearGradient
      colors={["#004C73", "#002335"]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: Dimensions.get("screen").height,
        zIndex: -1, // appear under the scrollview
        ...props.style,
      }}
    />
  );
};
