import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
  Center,
  VStack,
  Text,
  IconButton,
  Icon,
  ScrollView,
  Heading,
  useToast,
} from "native-base";
import { Feather } from "@expo/vector-icons";
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

type UserProps = {
  name: string;
  email: string;
  phone: string;
  born: string;
  gender: string;
};

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState<boolean>(false);
  const [userPhoto, setUserPhoto] = useState<string>(
    "https://github.com/rgranvilla.png"
  );

  const toast = useToast();

  const [user, setUser] = useState<UserProps>({
    name: "Ricardo Granvilla Oliveira",
    email: "rgranvilla@gmail.com",
    phone: "51992051821",
    born: "1981-05-05",
    gender: "male",
  });

  const [password, setPassword] = useState<string>();

  const [bornDate, setBornDate] = useState<Date>();
  const [gender, setGender] = useState<string>();
  const [name, setName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [securyPassword, setSecuryPassword] = useState<boolean>(true);

  const maximumDate = onlyLegalAge();

  useEffect(() => {
    setName(user.name);
    setBornDate(new Date(user.born));
    setGender(user.gender);
    setPhone(user.phone);
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
        if (photoSizeInMb && photoSizeInMb > 2) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 2MB",
            placement: "top-right",
            bgColor: "red.400",
          });
        }
        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPhotoIsLoading(false);
    }
  };

  return (
    <Container>
      <VStack flex={1}>
        <ScreenHeader title="Perfil" />

        <ScrollView>
          <Center mt={6} px={10} mb={6}>
            <UserPhoto
              source={{ uri: userPhoto }}
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

            <Input
              label="Nome"
              placeholder="Nome"
              value={name}
              autoCapitalize="none"
              variant="outline"
              type="text"
              onChangeText={(value) => setName(value)}
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

            <Input
              label="Telefone"
              placeholder="Telefone"
              value={phone}
              textContentType="telephoneNumber"
              variant="outline"
              type="text"
              onChangeText={(value) => setName(value)}
            />

            <Datepicker
              onConfirm={(date) => setBornDate(date)}
              date={maximumDate}
              label="Data de nascimento (opcional)"
              buttonTitle={
                bornDate ? formatDate(bornDate) : "Clique para selecionar"
              }
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

            <Heading
              fontSize="md"
              fontFamily="heading"
              textAlign="left"
              color="gray.100"
              w="full"
              mb={2}
            >
              Alterar senha
            </Heading>

            <Input
              label="Senha antiga"
              placeholder="Senha antiga"
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
              onChangeText={(value) => setPassword(value)}
            />
            <Input
              label="Nova senha"
              placeholder="Nova senha"
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
              onChangeText={(value) => setNewPassword(value)}
            />
            <Button
              title="Salvar Alterações"
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
