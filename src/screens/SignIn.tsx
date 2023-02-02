import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import {
  Center,
  Heading,
  Icon,
  IconButton,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Logo from "@assets/wsn_logo.png";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Button } from "@components/Button";
import { Container } from "@components/Container";
import { Input } from "@components/Input";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  password: yup.string().required("Informe a senha"),
});

export function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  const [securyPassword, setSecuryPassword] = useState<boolean>(true);

  const handleSignUpClick = () => {
    navigation.navigate("signUp");
  };

  const handleLogin = async ({ email, password }: FormDataProps) => {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde!";

      setIsLoading(false);

      toast.show({
        title,
        placement: "top",
        bgColor: "error.500",
      });
    }
  };

  return (
    <Container>
      <VStack flex={1} px={4}>
        <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
          <Center my={8}>
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

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  variant="outline"
                  type="text"
                  onChangeText={onChange}
                  value={value}
                  errorMsg={errors?.email?.message}
                  isRequired
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
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
                          <Icon
                            as={Feather}
                            name="eye"
                            size={4}
                            color="gray.300"
                          />
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
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleLogin)}
                  returnKeyType="send"
                  errorMsg={errors?.password?.message}
                  isRequired
                />
              )}
            />
            <Button
              title="Acessar"
              _pressed={{
                bg: "blue.400",
              }}
              onPress={handleSubmit(handleLogin)}
              isLoading={isLoading}
              disabled={isLoading}
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
        </ScrollView>
      </VStack>
    </Container>
  );
}
