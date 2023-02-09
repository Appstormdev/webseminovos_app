import "expo-dev-client";

import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";

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

export default function App() {
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
