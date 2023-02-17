import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Center, VStack, Text, ScrollView, useToast } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { Button } from "@components/Button";
import { Container } from "@components/Container";
import { Datepicker } from "@components/Datepicker";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { Select } from "@components/Select";
import { UserPhoto } from "@components/UserPhoto";
import { formatDate, onlyLegalAge } from "@utils/dateTools";
import { useAuth } from "@hooks/useAuth";
import UserPhotoDefault from "@assets/userPhotoDefault.png";

//NEW 22:25
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AppError } from "@utils/AppError";
import { parseISO } from "date-fns";
import { IUpdateProfile } from "@context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type FormDataProps = {
  name: string;
  gender: string;
  phone: string;
  born: Date | null;
};

const updateProfileSchema = yup.object().shape(
  {
    name: yup.string().required("Informe seu nome"),
    gender: yup
      .mixed()
      .nullable(true)
      .notRequired()
      .when("gender", {
        is: (value: string) => value?.length,
        then: (rule) => rule.oneOf(["male", "female", "other", "none"]),
      }),
    phone: yup
      .string()
      .nullable(true)
      .notRequired()
      .when("phone", {
        is: (value: string) => value?.length,
        then: (rule) => rule.min(11, "Informe seu numero de celular com DDD."),
      }),
    born: yup
      .date()
      .nullable(true)
      .notRequired()
      .transform((_, val) => (val instanceof Date ? val : null)),
  },
  [
    ["gender", "gender"],
    ["phone", "phone"],
    ["born", "born"],
  ]
);

export function Profile() {
  const { user, handleChangeAvatar, updateProfile, isLoading } = useAuth();
  const [photoIsLoading, setPhotoIsLoading] = useState<boolean>(false);
  const [userPhoto, setUserPhoto] = useState<string>(user.avatarUrl);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(updateProfileSchema),
  });

  useEffect(() => {
    if (!!errors) console.log("[PROFILE FORM ERROR]", errors);
  }, [errors]);

  const maximumDate = onlyLegalAge();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue(
        "born",
        user.born !== null ? new Date(parseISO(user.born)) : null
      );
      setValue("gender", user.gender);
      setValue("phone", user.phone);
    }
  }, []);

  const handleUserPhotoSelect = async () => {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        const photoSizeInMb = photoInfo.size && photoInfo.size / 1024 / 1024;
        if (photoSizeInMb && photoSizeInMb > 1.5) {
          return toast.show({
            title: "Essa imagem é muito grande.\n Escolha uma de até 1.5MB",
            placement: "top",
            bgColor: "red.400",
            _title: {
              fontSize: "md",
              fontWeight: "semibold",
              paddingX: 8,
              textAlign: "center",
            },
          });
        }
        setUserPhoto(photoSelected.assets[0].uri);
        handleChangeAvatar({
          imageUri: photoSelected.assets[0].uri,
          clientId: user.id,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPhotoIsLoading(false);
    }
  };

  const handleUpdate = async (data: FormDataProps) => {
    const newData: IUpdateProfile = {
      name: data.name,
    };

    if (data.born)
      Object.assign(newData, {
        ...newData,
        born: data.born,
      });

    if (data.gender)
      Object.assign(newData, {
        ...newData,
        gender: data.gender,
      });

    if (data.phone)
      Object.assign(newData, {
        ...newData,
        phone: data.phone,
      });

    try {
      const hasUpdated = await updateProfile(newData);
      if (hasUpdated) {
        const title = "Seus dados foram atualizados com sucesso!";

        toast.show({
          title,
          placement: "top",
          bgColor: "green.500",
        });

        navigation.navigate("home");
      } else {
        console.log(hasUpdated);
        const title =
          "Não foi possível atualizar os seus dados. Tente novamente mais tarde! 2";

        toast.show({
          title,
          placement: "top",
          bgColor: "error.500",
        });
      }
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível atualizar os seus dados. Tente novamente mais tarde!";

      toast.show({
        title,
        placement: "top",
        bgColor: "error.500",
      });
    }
  };

  return (
    <Container>
      <VStack flex={1}>
        <ScreenHeader title="Perfil" />

        <ScrollView>
          <Center mt={6} px={10} mb={6}>
            <UserPhoto
              source={userPhoto ? { uri: userPhoto } : UserPhotoDefault}
              alt="Foto do usuário"
              size={128}
              isLoading={photoIsLoading}
            />

            <TouchableOpacity onPress={handleUserPhotoSelect}>
              <Text
                color="gray.100"
                fontWeight="bold"
                fontSize="md"
                mt={2}
                mb={8}
              >
                Alterar foto
              </Text>
            </TouchableOpacity>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Nome"
                  placeholder="Nome"
                  autoCapitalize="none"
                  variant="outline"
                  value={value}
                  type="text"
                  onChangeText={onChange}
                  errorMsg={errors?.name?.message}
                  isRequired
                />
              )}
            />

            <Input
              label="Email"
              value={user.email}
              isDisabled
              keyboardType="email-address"
              autoCapitalize="none"
              variant="outline"
              type="text"
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Telefone"
                  placeholder="Telefone"
                  value={value}
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  variant="outline"
                  type="text"
                  onChangeText={onChange}
                  errorMsg={errors?.phone?.message}
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
                  label="Data de nascimento (opcional)"
                  buttonTitle={
                    value !== null
                      ? formatDate(new Date(value))
                      : "Clique para selecionar"
                  }
                  locale="pt-BR"
                  mode="date"
                  cancelText="Cancelar"
                  title="Selecione sua data de nascimento"
                  confirmText="Confirmar"
                  maximumDate={maximumDate}
                />
              )}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <Select.Root
                  label="Gênero (opcional)"
                  selectedValue={value}
                  onValueChange={onChange}
                  txtColor="gray.100"
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
              title="Salvar Alterações"
              onPress={handleSubmit(handleUpdate)}
              isLoading={isLoading}
              disabled={isLoading}
              _pressed={{
                bg: "blue.400",
              }}
              mt={8}
            />
          </Center>
        </ScrollView>
      </VStack>
    </Container>
  );
}
