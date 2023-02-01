import {
  Center,
  Divider,
  Heading,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
} from "native-base";
import { Feather } from "@expo/vector-icons";

import Container from "../components/Container";

import Logo from "../assets/wsn_logo.png";
import { Input } from "@components/Input";
import { useState } from "react";
import { Button } from "@components/Button";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const [securyPassword, setSecuryPassword] = useState<boolean>(true);

  const handleSignUpClick = () => {
    navigation.navigate("signUp");
  };

  return (
    <Container>
      <VStack flex={1} px={4}>
        <Center my={16}>
          <Image
            source={Logo}
            alt="Logo da Web Semi Novos"
            resizeMode="contain"
            w={120}
          />
        </Center>

        <Center mb={20}>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Input
            label="Email"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            variant="outline"
            type="text"
          />

          <Input
            label="Senha"
            placeholder="Senha"
            variant="outline"
            type="password"
            secureTextEntry={securyPassword}
            rightElement={
              <IconButton
                icon={
                  securyPassword ? (
                    <Icon as={Feather} name="eye" size={4} color="gray.300" />
                  ) : (
                    <Icon
                      as={Feather}
                      name="eye-off"
                      size={4}
                      color="gray.300"
                    />
                  )
                }
                onPress={() => setSecuryPassword(!securyPassword)}
              />
            }
          />

          <Button
            title="Acessar"
            _pressed={{
              bg: "blue.400",
            }}
          />
        </Center>

        <Center mb={10}>
          <Text color="gray.300" mb={6}>
            Não possui uma conta ainda?
          </Text>
          <Button
            title="Crie uma conta"
            bg="transparent"
            txtColor="blue.300"
            _pressed={{
              opacity: 0.9,
            }}
            onPress={handleSignUpClick}
            variant="outline"
            borderColor="blue.300"
            borderWidth={2}
          />
        </Center>
      </VStack>
    </Container>
  );
}
