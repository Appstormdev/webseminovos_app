import { Linking, Platform } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useEffect, useState } from "react";
import { Loading } from "@components/Loading";
import {
  getStoragePersistence,
  saveStoragePersistence,
} from "@storage/storagePersistence";

const linking = {
  prefixes: ["com.wsnbeacon://", "exp+wsnbeacon://", "wsnbecon://"],
  config: {
    screens: {
      offers: {
        path: "offers/:promoId",
        parse: {
          promoId: (promoId: string) => promoId,
        },
      },
    },
  },
};

export function Routes() {
  const navigationRef = useNavigationContainerRef();

  const { userToken, isLoadingUserToken } = useAuth();

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  //Restore route state
  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (
          Platform.OS !== "web" &&
          initialUrl === "com.wsnbeacon://192.168.0.11:8081"
        ) {
          // Only restore state if there's no deep link and we're not on web
          const state = await getStoragePersistence();

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady || isLoadingUserToken) {
    return <Loading />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      onStateChange={async (state) => {
        console.log("save:", state);
        await saveStoragePersistence(state);
      }}
    >
      {userToken ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
