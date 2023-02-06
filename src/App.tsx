import "expo-dev-client";
import OneSignal from "react-native-onesignal";
import {
  Alert,
  NativeEventEmitter,
  NativeModules,
  StatusBar,
} from "react-native";
import { NativeBaseProvider, useToast } from "native-base";

import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import { THEME } from "@theme/index";

import { Loading } from "@components/Loading";
import { AppContextProviders } from "@context/index";
import { Routes } from "@routes/index";
import { useEffect, useState } from "react";
import {
  initialize,
  requestPermissionsBackground,
  requestPermissions,
  addLocationListener,
  calculateLocation,
  //@ts-ignore
} from "react-native-zapt-sdk";
import useBLE from "@services/useBLE";
const placeId = "-nmf8aqficgvin6zka2_";
OneSignal.setAppId("74d0b39e-d9e3-4c97-8a4f-7cf8429b5b2b");

export default function App() {
  useEffect(() => {
    requestPermissions((isGranted: boolean) => {});
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_900Black,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <AppContextProviders>
          {fontsLoaded ? <Routes /> : <Loading />}
        </AppContextProviders>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
