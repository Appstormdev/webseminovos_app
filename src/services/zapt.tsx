import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
} from "react-native";
//@ts-ignore
import { addLocationListener } from "react-native-zapt-sdk";

const ZAPT_PLACE_ID = "-nmf8aqficgvin6zka2_";

let lastEnviromentId: any;
let lastToastEvent: any;

export function startListenterZaptSDK() {
  const eventEmitter = new NativeEventEmitter(NativeModules.ReactNativeZaptSdk);

  eventEmitter.addListener("ReactNativeZaptSdkBeaconsFound", (data) => {
    console.info("beacon found event");
  });

  eventEmitter.addListener("ReactNativeZaptSdkBeaconsRegionEnter", (event) => {
    console.info("ReactNativeZaptSdkBeaconsRegionEnter");
  });

  eventEmitter.addListener("ReactNativeZaptSdkBeaconsRegionExit", (event) => {
    console.info("ReactNativeZaptSdkBeaconsRegionExit");
  });

  eventEmitter.addListener("ReactNativeZaptSdkBeaconsRegionEnter", (event) => {
    console.info("ReactNativeZaptSdkBeaconsRegionEnter");
  });

  addLocationListener(ZAPT_PLACE_ID, (location: any) => {
    // console.log('=======addLocationListener==========')
    const { title, externalId } = location.nearestPoi;
    const environmentId = externalId;

    if (lastToastEvent && Date.now() - lastToastEvent <= 10000) return;

    if (externalId && environmentId !== lastEnviromentId) {
      lastEnviromentId = environmentId;

      DeviceEventEmitter.emit("BeaconEnvironmentFound", {
        environmentId,
        title,
      });
      lastToastEvent = Date.now();
    }
  });
}
