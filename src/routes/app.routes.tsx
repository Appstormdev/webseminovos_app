import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { Icon, useTheme } from "native-base";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import { Profile } from "@screens/Profile";
import { Favorites } from "@screens/Favorites";

type AppRoutes = {
  favorites: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();
  const iconSize = 8;
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.blue[900],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[8],
        },
        tabBarInactiveTintColor: colors.gray[500],
        tabBarActiveTintColor: colors.gray[100],
      }}
    >
      <Screen
        name="favorites"
        component={Favorites}
        navigationKey="favorites"
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Icon
                as={MaterialIcons}
                name="favorite"
                size={iconSize}
                color={color}
              />
            ) : (
              <Icon
                as={MaterialIcons}
                name="favorite-outline"
                size={iconSize}
                color={color}
              />
            ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Icon
                as={FontAwesome}
                name="user-circle"
                size={iconSize}
                color={color}
              />
            ) : (
              <Icon
                as={FontAwesome}
                name="user-circle-o"
                size={iconSize}
                color={color}
              />
            ),
        }}
      />
    </Navigator>
  );
}
