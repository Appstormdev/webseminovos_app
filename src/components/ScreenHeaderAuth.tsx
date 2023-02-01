import { Button, HStack, Image, Text } from "native-base";

import Logo from "@assets/wsn_logo.png";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

interface ScreenHeaderAuthProps {
  title: string;
}
export function ScreenHeaderAuth({ title }: ScreenHeaderAuthProps) {
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
          <Text color="gray.100" fontSize="md">
            Login
          </Text>
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
}
