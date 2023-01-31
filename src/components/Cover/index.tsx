import { ReactNode } from "react";
import { Dimensions, View } from "react-native";

interface CoverProps {
  children: ReactNode;
  height: number;
}

export const Cover = ({ children, height = 240 }: CoverProps) => {
  return (
    <>
      <View
        style={{
          width: Dimensions.get("screen").width,
          height,

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </View>
    </>
  );
};
