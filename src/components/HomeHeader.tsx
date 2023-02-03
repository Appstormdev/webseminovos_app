import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { UserPhoto } from "./UserPhoto";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import UserPhotoDefault from "@assets/userPhotoDefault.png";

export function HomeHeader() {
  const { logout, user, isLoadingUserToken } = useAuth();
  const [isReady, setIsReady] = useState(false);

  if (isLoadingUserToken) {
    return null;
  }

  useEffect(() => {
    if (!isReady) {
      setIsReady(true);
    }
  }, [isReady]);

  if (!isReady || isLoadingUserToken) {
    return <Loading />;
  }

  return (
    <HStack bg="blue.500" pt={12} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={user.avatarUrl ? { uri: user.avatarUrl } : UserPhotoDefault}
        alt="Imagem do usuário"
        size={12}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
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
