import { ReactNode } from "react";
import { Dimensions, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundGradientImage } from "../Background";

interface IContainer {
  children: ReactNode;
  style?: ViewStyle;
}

function Fixed({ children, style }: IContainer) {
  return (
    <>
      <BackgroundGradientImage />

      <SafeAreaView>
        <View
          style={{
            marginHorizontal: 16,
            height: Dimensions.get("window").height,

            ...style,
          }}
        >
          {children}
        </View>
      </SafeAreaView>
    </>
  );
}

export { Fixed };
