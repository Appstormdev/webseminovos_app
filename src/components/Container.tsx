import { View, ScrollView } from "native-base";
import React, { ReactNode } from "react";
import { ViewStyle, RefreshControl, Dimensions } from "react-native";
import { BackgroundGradientImage } from "./BackgroundGradientImage";
interface IContainer {
  children: ReactNode;
  style?: ViewStyle;
  refreshing?: boolean;
  onRefresh?: () => void;
  hasHeader?: boolean;
}
const Container = React.forwardRef<any, IContainer>(
  (props: IContainer, ref: any) => {
    const { children, style, refreshing, onRefresh, hasHeader } = props;

    return (
      <View flex={1} bg="transparent">
        <BackgroundGradientImage />
        <ScrollView
          ref={ref}
          contentContainerStyle={{
            flex: 1,
            marginTop: hasHeader ? 0 : 50,
            ...style,
          }}
          refreshControl={
            onRefresh && (
              <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
            )
          }
          showsVerticalScrollIndicator={false}
          flex={1}
        >
          {children}
        </ScrollView>
      </View>
    );
  }
);
export default Container;
