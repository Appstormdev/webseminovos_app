import { Center, Heading, Image, VStack } from "native-base";

import Container from "@components/Container";

import Logo from "@assets/wsn_logo.png";
import { Input } from "@components/Input";
import { useState } from "react";
import { Button } from "@components/Button";

import { Datepicker } from "@components/Datepicker";
import { formatDate, onlyLegalAge } from "@utils/dateTools";
import { useNavigation } from "@react-navigation/native";
import { Select } from "@components/Select";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const [date, setDate] = useState<Date | null>(null);
  const [gender, setGender] = useState<string>("");

  const maximumDate = onlyLegalAge();

  const handleBackToSignIn = () => {
    navigation.navigate("signIn");
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
            Crie sua conta
          </Heading>

          <Input
            label="Nome"
            placeholder="Nome"
            autoCapitalize="none"
            variant="outline"
            type="text"
          />

          <Input
            label="Email"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            variant="outline"
            type="text"
          />

          <Datepicker
            onConfirm={(date) => setDate(date)}
            date={maximumDate}
            label="Data de nascimento (opcional)"
            buttonTitle={date ? formatDate(date) : "Clique para selecionar"}
            locale="pt-BR"
            mode="date"
            cancelText="Cancelar"
            title="Selecione sua data de nascimento"
            confirmText="Confirmar"
            maximumDate={maximumDate}
          />

          <Select.Root
            label="Gênero (opcional)"
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            txtColor="gray.100"
          >
            <Select.Item
              label="Masculino"
              value="male"
              _text={{
                color: `${gender === "male" ? "gray.100" : "gray.700"}`,
              }}
            />
            <Select.Item
              label="Feminino"
              value="female"
              _text={{
                color: `${gender === "female" ? "gray.100" : "gray.700"}`,
              }}
            />
            <Select.Item
              label="Outro"
              value="other"
              _text={{
                color: `${gender === "other" ? "gray.100" : "gray.700"}`,
              }}
            />
            <Select.Item
              label="Prefiro não dizer"
              value="none"
              _text={{
                color: `${gender === "none" ? "gray.100" : "gray.700"}`,
              }}
            />
          </Select.Root>

          <Button
            title="Criar Conta"
            _pressed={{
              bg: "blue.400",
            }}
          />
        </Center>

        <Button
          title="Voltar para login"
          bg="transparent"
          txtColor="blue.300"
          _pressed={{
            opacity: 0.9,
          }}
          onPress={handleBackToSignIn}
          variant="outline"
          borderColor="blue.300"
          borderWidth={2}
          mb={10}
        />
      </VStack>
    </Container>
  );
}
