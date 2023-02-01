import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Box } from "native-base";

import { Home } from "@screens/Home";
import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";
import { Stores } from "@screens/Stores";
import { Welcome } from "@screens/Welcome";

import { BackgroundGradientImage } from "@components/Background";

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
  home: undefined;
  stores: undefined;
  welcome: undefined;
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
        <Screen name="home" component={Home} />
        <Screen name="signIn" component={SignIn} />
        <Screen name="signUp" component={SignUp} />
        <Screen name="stores" component={Stores} />
        <Screen name="welcome" component={Welcome} />
      </Navigator>
    </Box>
  );
}
