import { Button, HStack, Icon, Image, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import Logo from "@assets/wsn_logo.png";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function ScreenHeaderAuth() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  return (
    <HStack bg="blue.500" pb={4} pt={12}>
      <HStack flex={1} justifyContent="space-around" alignItems="center">
        <Image
          source={Logo}
          alt="Logo da web semi novos"
          w={20}
          h={10}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation.navigate("signIn")}>
          <Icon
            as={MaterialIcons}
            name="login"
            color="gray.100"
            size={7}
            onPress={() => navigation.navigate("signIn")}
          />
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
}
