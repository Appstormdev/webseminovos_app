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
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

import { THEME } from "@theme/index";

import { Loading } from "@components/Loading";
import { AppContextProviders } from "@context/index";
import { Routes } from "@routes/index";
import { useEffect } from "react";

// const BACKGROUND_BEACON_LISTENER_TASK = "background-beacon-listener-task";

// TaskManager.defineTask(BACKGROUND_BEACON_LISTENER_TASK, async () => {
//   const now = Date.now();

//   console.log(
//     `Got background fetch call at date: ${new Date(now).toISOString()}`
//   );

//   // Be sure to return the successful result type!
//   return BackgroundFetch.BackgroundFetchResult.NewData;
// });

// async function registerBackgroundFetchAsync() {
//   return BackgroundFetch.registerTaskAsync(BACKGROUND_BEACON_LISTENER_TASK, {
//     minimumInterval: 10, // 10 segundos
//     stopOnTerminate: false, // android only,
//     startOnBoot: true, // android only
//   });
// }

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
