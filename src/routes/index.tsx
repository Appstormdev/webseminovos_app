import { Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useEffect, useState } from "react";
import { useOffers } from "@hooks/useOffers";

const PERSISTENCE_KEY = "@wsnBeacon:NAVIGATION_STATE_V1";

export function Routes() {
  const { userToken } = useAuth();

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== "web" && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

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

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      {userToken ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
