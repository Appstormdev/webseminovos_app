import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { UserPhoto } from "./UserPhoto";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";

export function HomeHeader() {
  const { logout } = useAuth();

  return (
    <HStack bg="blue.500" pt={12} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={{ uri: `https://github.com/rgranvilla.png` }}
        alt="Imagem do usuário"
        size={12}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Ricardo
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon
          as={MaterialIcons}
          name="logout"
          color="gray.100"
          size={7}
          onPress={() => logout()}
        />
      </TouchableOpacity>
    </HStack>
  );
}
