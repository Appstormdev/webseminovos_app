import { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackgroundGradientImage } from "../Background";
import { Cover } from "../Cover";
import { Fixed } from "./Fixed";

interface IContainer {
  children: ReactNode;
  headerContent?: ReactNode;
  coverContent?: ReactNode;
  coverHeight?: number;
  style?: ViewStyle;
  refreshing?: boolean;
  onRefresh?: () => void;
  mode:
    | "withScrollView"
    | "withScrollViewAndHeader"
    | "withScrollViewAndCover"
    | "withScrollViewHeaderAndCover"
    | "fixed"
    | "fixedWithCover"
    | "fixedWithHeader"
    | "fixedWithHeaderAndCover";
}

const ContainerBase: ForwardRefRenderFunction<any, IContainer> = (
  {
    mode = "fixed",
    children,
    headerContent,
    coverContent,
    coverHeight = 240,
    style,
    refreshing,
    onRefresh,
  }: IContainer,
  forwardedRef: any
) => {
  return (
    <>
      {mode === "fixed" && <Fixed style={style}>{children}</Fixed>}

      {mode === "fixedWithHeader" && (
        <>
          <BackgroundGradientImage />

          <SafeAreaView>
            {headerContent ? <>{headerContent}</> : null}

            <View
              style={{
                marginHorizontal: 16,
                marginVertical: 12,
                height: Dimensions.get("window").height - 72,

                ...style,
              }}
            >
              {children}
            </View>
          </SafeAreaView>
        </>
      )}
      {mode === "fixedWithCover" && (
        <>
          <BackgroundGradientImage />

          <SafeAreaView>
            <>
              {coverContent ? (
                <Cover height={coverHeight}>{coverContent}</Cover>
              ) : null}
            </>

            <View
              style={{
                marginHorizontal: 16,
                marginVertical: 12,
                height: Dimensions.get("window").height - coverHeight - 24,

                ...style,
              }}
            >
              {children}
            </View>
          </SafeAreaView>
        </>
      )}

      {mode === "fixedWithHeaderAndCover" && (
        <>
          <BackgroundGradientImage />

          <SafeAreaView>
            {headerContent ? <>{headerContent}</> : null}

            <>
              {coverContent ? (
                <Cover height={coverHeight}>{coverContent}</Cover>
              ) : null}
            </>

            <View
              style={{
                marginHorizontal: 16,
                marginVertical: 12,
                height: Dimensions.get("window").height - coverHeight - 72,

                ...style,
              }}
            >
              {children}
            </View>
          </SafeAreaView>
        </>
      )}

      {mode === "withScrollView" && (
        <>
          <BackgroundGradientImage />

          <SafeAreaView>
            <ScrollView
              ref={forwardedRef}
              contentContainerStyle={{
                padding: 16,
                minHeight: Dimensions.get("window").height,
                ...style,
              }}
              refreshControl={
                onRefresh && (
                  <RefreshControl
                    refreshing={!!refreshing}
                    onRefresh={onRefresh}
                  />
                )
              }
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </SafeAreaView>
        </>
      )}

      {mode === "withScrollViewAndHeader" && (
        <>
          <BackgroundGradientImage />

          <SafeAreaView style={{ marginBottom: 48 }}>
            {headerContent ? <>{headerContent}</> : null}

            <ScrollView
              ref={forwardedRef}
              contentContainerStyle={{
                padding: 16,
                minHeight: "100%",
                ...style,
              }}
              refreshControl={
                onRefresh && (
                  <RefreshControl
                    refreshing={!!refreshing}
                    onRefresh={onRefresh}
                  />
                )
              }
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </SafeAreaView>
        </>
      )}

      {mode === "withScrollViewAndCover" && (
        <>
          <BackgroundGradientImage />

          <SafeAreaView>
            <ScrollView
              ref={forwardedRef}
              contentContainerStyle={{
                padding: 16,
                minHeight: "100%",
                ...style,
              }}
              refreshControl={
                onRefresh && (
                  <RefreshControl
                    refreshing={!!refreshing}
                    onRefresh={onRefresh}
                  />
                )
              }
              showsVerticalScrollIndicator={false}
            >
              <View
                style={{
                  margin: -16,
                  marginBottom: 8,
                }}
              >
                {coverContent ? (
                  <Cover height={coverHeight}>{coverContent}</Cover>
                ) : null}
              </View>
              {children}
            </ScrollView>
          </SafeAreaView>
        </>
      )}

      {mode === "withScrollViewHeaderAndCover" && (
        <>
          <BackgroundGradientImage />

          <SafeAreaView>
            {headerContent ? <>{headerContent}</> : null}

            <ScrollView
              ref={forwardedRef}
              contentContainerStyle={{
                padding: 16,
                paddingBottom: 60,
                minHeight: "100%",
                ...style,
              }}
              refreshControl={
                onRefresh && (
                  <RefreshControl
                    refreshing={!!refreshing}
                    onRefresh={onRefresh}
                  />
                )
              }
              showsVerticalScrollIndicator={false}
            >
              <View
                style={{
                  margin: -16,
                  marginBottom: 8,
                }}
              >
                {coverContent ? (
                  <Cover height={coverHeight}>{coverContent}</Cover>
                ) : null}
              </View>
              {children}
            </ScrollView>
          </SafeAreaView>
        </>
      )}
    </>
  );
};

export const Container = forwardRef(ContainerBase);
