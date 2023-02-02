import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Box } from "native-base";

import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";
import { Stores } from "@screens/Stores";
import { Welcome } from "@screens/Welcome";
import { Offers } from "@screens/Offers";
import { PromoDetailUnauthenticated } from "@screens/PromoDetailPromoDetailUnauthenticated";

import { BackgroundGradientImage } from "@components/BackgroundGradientImage";

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
  stores: undefined;
  welcome: undefined;
  offers: undefined;
  promoDetailUnauthenticated: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Box flex={1}>
      <BackgroundGradientImage />
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="welcome" component={Welcome} />
        <Screen name="offers" component={Offers} />
        <Screen name="signIn" component={SignIn} />
        <Screen name="signUp" component={SignUp} />
        <Screen name="stores" component={Stores} />
        <Screen
          name="promoDetailUnauthenticated"
          component={PromoDetailUnauthenticated}
        />
      </Navigator>
    </Box>
  );
}
