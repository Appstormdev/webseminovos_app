import {
  Keyboard,
  NativeEventEmitter,
  NativeModules,
  Platform,
  StatusBar,
} from "react-native";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import { THEME } from "./src/theme";

import { Loading } from "@components/Loading";
import { AppContextProviders } from "@context/index";
import { Routes } from "@routes/index";
//@ts-ignore
import { initialize } from "react-native-zapt-sdk";
import { useEffect } from "react";
import { startListenterZaptSDK } from "@services/zapt";

const ZAPT_PLACE_ID = "-nmf8aqficgvin6zka2_";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_900Black,
  });

  useEffect(() => {
    initialize(ZAPT_PLACE_ID).then(startListenterZaptSDK);
  }, []);

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
