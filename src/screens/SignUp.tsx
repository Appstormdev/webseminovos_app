import {
  Center,
  Heading,
  Image,
  ScrollView,
  useToast,
  VStack,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Logo from "@assets/wsn_logo.png";

import { Button } from "@components/Button";
import { Container } from "@components/Container";
import { Datepicker } from "@components/Datepicker";
import { Input } from "@components/Input";
import { Select } from "@components/Select";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { formatDate, onlyLegalAge } from "@utils/dateTools";
import { api, apiMultiForm } from "@services/api";
import { AppError } from "@utils/AppError";
import { format, formatISO9075 } from "date-fns";

type FormDataProps = {
  name: string;
  email: string;
  born: Date;
  gender: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
});

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const maximumDate = onlyLegalAge();

  const handleSignUp = async (data: FormDataProps) => {
    const { name, email, gender, born } = data;
    const companyId = "";

    const newData = {
      name: name,
      email: email,
    };

    if (!!gender) {
      Object.assign(newData, {
        gender: gender,
      });
    }

    if (born) {
      Object.assign(newData, {
        born_date: formatISO9075(new Date(born)),
      });
    }

    if (companyId) {
      Object.assign(newData, {
        company_id: companyId,
      });
    }

    try {
      const response = await apiMultiForm.post("clients/new_app", newData);
      const { status } = response?.data;

      let title = "";

      if (status === "SUCCESS")
        title =
          "Cadastro realizado com sucesso!\n Você receberá um email com a sua senha de acesso!";

      if (!!title) {
        toast.show({
          title,
          placement: "top",
          bgColor: "green.500",
        });
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde!";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  const handleBackToSignIn = () => {
    navigation.navigate("signIn");
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
              Crie sua conta
            </Heading>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Nome"
                  placeholder="Nome"
                  autoCapitalize="none"
                  variant="outline"
                  type="text"
                  onChangeText={onChange}
                  value={value}
                  errorMsg={errors?.name?.message}
                  isRequired
                />
              )}
            />

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
              name="born"
              render={({ field: { onChange, value } }) => (
                <Datepicker
                  onConfirm={onChange}
                  date={maximumDate}
                  label="Data de nascimento"
                  buttonTitle={
                    value ? formatDate(value) : "Clique para selecionar"
                  }
                  locale="pt-BR"
                  mode="date"
                  cancelText="Cancelar"
                  title="Selecione sua data de nascimento"
                  confirmText="Confirmar"
                  maximumDate={maximumDate}
                  errorMsg={errors?.born?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <Select.Root
                  label="Gênero"
                  selectedValue={value}
                  onValueChange={onChange}
                  txtColor="gray.100"
                  errorMsg={errors?.gender?.message}
                >
                  <Select.Item
                    label="Masculino"
                    value="male"
                    _text={{
                      color: `${value === "male" ? "gray.100" : "gray.700"}`,
                    }}
                  />
                  <Select.Item
                    label="Feminino"
                    value="female"
                    _text={{
                      color: `${value === "female" ? "gray.100" : "gray.700"}`,
                    }}
                  />
                  <Select.Item
                    label="Outro"
                    value="other"
                    _text={{
                      color: `${value === "other" ? "gray.100" : "gray.700"}`,
                    }}
                  />
                  <Select.Item
                    label="Prefiro não dizer"
                    value="none"
                    _text={{
                      color: `${value === "none" ? "gray.100" : "gray.700"}`,
                    }}
                  />
                </Select.Root>
              )}
            />
            <Button
              title="Criar Conta"
              _pressed={{
                bg: "blue.400",
              }}
              onPress={handleSubmit(handleSignUp)}
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
        </ScrollView>
      </VStack>
    </Container>
  );
}
