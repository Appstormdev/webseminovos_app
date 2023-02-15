import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import {
  initialize,
  requestPermissionsBackground,
  getMapLink,
  ZaptMap,
  addLocationListener,
  calculateLocation,
  setDisableSyncingForAnalytics,
  setDisableSyncingForPositioning,
  //@ts-ignore
} from "react-native-zapt-sdk";
import { ZAPT_PLACE_ID } from "@env";
import { NativeEventEmitter, NativeModules } from "react-native";

export const BACKGROUND_FETCH_TASK = "background-fetch";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

export async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 10, // 10 seconds
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

export async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

// let beaconId: "";
// try {
//   initialize(ZAPT_PLACE_ID).then(() => {
//     requestPermissionsBackground({
//       titleAlert: "Esse app necessita de acesso a localização",
//       messageAlert:
//         "Para te apresentarmos notificações por proximidades necessitamos da permissão de localização sempre",
//       titleNoGranted: "Funcionalidade limitada sem a permissão de localização",
//       messageNoGranted:
//         "Como a permissão de localização o tempo todo não foi concedida esse ap não vai te enviar as melhores notificações por proximidade. Para alterar a permissão acesse: Configurações -> Aplicativos -> Permissões e conceda a permissão total",
//     }).then(async () => {
//       await setDisableSyncingForAnalytics(false);
//       await setDisableSyncingForPositioning(true);

//       const eventEmitter = new NativeEventEmitter(
//         NativeModules.ReactNativeZaptSdk
//       );

//       eventEmitter.addListener("ReactNativeZaptSdkBeaconsFound", (event) => {
//         console.info("beacon found event in background ===>>", event);
//         beaconId = event.uuid;
//         return beaconId
//           ? BackgroundFetch.BackgroundFetchResult.NewData
//           : BackgroundFetch.BackgroundFetchResult.NoData;
//       });

//       addLocationListener(ZAPT_PLACE_ID, (location: any) => {
//         console.info("Location found: ", location);
//         return location
//           ? BackgroundFetch.BackgroundFetchResult.NewData
//           : BackgroundFetch.BackgroundFetchResult.NoData;
//       });
//     });
//   });
// } catch (err) {
//   return BackgroundFetch.BackgroundFetchResult.Failed;
// }
