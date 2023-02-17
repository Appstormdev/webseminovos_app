import { createContext, ReactNode, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import * as FileSystem from "expo-file-system";

import {
  saveStorageUser,
  getStorageUser,
  removeStorageUser,
} from "@storage/storageUser";
import { IOffersDTO } from "@dtos/OffersDTO";
import {
  getStorageAuthToken,
  removeStorageAuthToken,
  saveStorageAuthToken,
} from "@storage/storageAuthToken";
import { apiMultiForm, fetchApi } from "@services/api";
import { formatDistanceToNow, formatISO9075, parseJSON } from "date-fns";
import { ptBR } from "date-fns/locale";
import { API_URL } from "@env";

export type UserProps = {
  name: string;
  email: string;
  phone: string;
  born: string;
  gender: string;
  avatarUrl: string;
};

type IFavorite = {
  promoId: string;
  title: string;
  description: string;
  imageUrl: string;
};

type IUserInfoDTO = {
  client_name: string;
  client_email: string;
  client_telephone: string;
  client_born_date: string;
  client_create_at: string;
  client_status: string;
  client_company_id: string;
  client_avatar: string;
  client_gender: string;
  client_id: string;
  client_favorites: string;
};

export type IUserLoggedInfo = {
  avatarUrl: string;
  born: string;
  clientFor: string;
  email: string;
  fromCompany: string;
  gender: string;
  id: string;
  name: string;
  phone: string;
  status: string;
  favorites: IOffersDTO[];
};

type IUploadAvatar = {
  imageUri: string;
  clientId: string;
};

export type AuthContextDataProps = {
  user: IUserLoggedInfo;
  userToken: string;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: IUpdateProfile) => Promise<boolean>;
  handleChangeAvatar: (data: IUploadAvatar) => Promise<void>;
  handleFavorited: (offer: IOffersDTO) => void;
  favorites: IOffersDTO[];
  getFavoritedList: () => IFavorite[];
  thisOfferIsFavorited: (offerId: string) => boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export type IUpdateProfile = {
  name: string;
  phone?: string;
  gender?: string;
  born?: Date;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export let CLIENT_TOKEN = "";

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<IUserLoggedInfo>({} as IUserLoggedInfo);
  const [userToken, setUserToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<IOffersDTO[]>([]);

  async function updateProfile(data: IUpdateProfile): Promise<boolean> {
    setIsLoading(true);
    let response: boolean = false;
    try {
      const companyId = "";

      const newData = {
        id_: user.id,
        email: user.email,
        name: data.name,
        company_id: companyId,
      };

      if (data.born)
        Object.assign(newData, {
          ...newData,
          born_date: formatISO9075(data.born),
        });

      if (data.gender)
        Object.assign(newData, {
          ...newData,
          gender: data.gender,
        });

      if (data.phone)
        Object.assign(newData, {
          ...newData,
          telephone: data.phone,
        });

      if (user.favorites)
        Object.assign(newData, {
          ...newData,
          favorites: JSON.stringify(user.favorites),
        });

      await fetchApi({
        url: "clients/update_app_v1",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: newData,
        onError: (err) => {
          console.log("[FETCH ON ERROR PROFILE]", err);
        },
        onSuccess: async (res) => {
          console.log("[FETCH UPDATE PROFILE]", res);
          if (res.status === "SUCCESS") {
            setUser({
              ...user,
              name: data.name,
              born: data.born ? formatISO9075(data.born) : "",
              gender: data.gender ? data.gender : "",
              phone: data.phone ? data.phone : "",
            });
            response = true;
          } else {
            response = false;
          }
        },
      });
      setIsLoading(false);
      return response;
    } catch (error) {
    } finally {
      setIsLoading(false);
      return response;
    }
  }

  async function updateUserAndToken(userData: IUserLoggedInfo, token: string) {
    //TODO: Atualizar o cabeçalho da requisição backend
    setUser(userData);
    setUserToken(token);
  }

  async function saveStorageUserAndToken(
    userData: IUserLoggedInfo,
    token: string
  ) {
    try {
      setIsLoading(true);

      await saveStorageUser(userData);
      await saveStorageAuthToken(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function removeStorageUserAndToken() {
    try {
      await removeStorageUser();
      await removeStorageAuthToken();
    } catch (error) {
      throw error;
    }
  }

  function clearAllState() {
    try {
      setUser({} as IUserLoggedInfo);
      setUserToken("");
      setFavorites([] as IOffersDTO[]);
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      setIsLoading(true);

      await removeStorageUserAndToken();
      clearAllState();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    try {
      setIsLoading(true);
      const loginData = {
        email: email,
        password: password,
      };

      const response = await apiMultiForm.post(
        `auth/login_client_app_v1`,
        loginData
      );

      const { status, user_token } = response.data;

      if (status === "SUCCESS") {
        const userInfo = jwt_decode(user_token);
        const {
          client_name,
          client_email,
          client_telephone,
          client_born_date,
          client_create_at,
          client_status,
          client_company_id,
          client_avatar,
          client_gender,
          client_id,
          client_favorites,
        } = userInfo as IUserInfoDTO;
        //TODO: remove replace url from avatar when production
        const userLogged: IUserLoggedInfo = {
          id: client_id,
          name: client_name,
          email: client_email,
          phone: client_telephone,
          born: client_born_date,
          gender: client_gender,
          clientFor: formatDistanceToNow(parseJSON(client_create_at), {
            locale: ptBR,
          }),
          status: client_status,
          fromCompany: client_company_id,
          avatarUrl: client_avatar.replace("localhost", "192.168.0.5"),
          favorites:
            client_favorites !== ""
              ? JSON.parse(client_favorites)
              : ([] as IOffersDTO[]),
        };

        if (!!userLogged) {
          await saveStorageUserAndToken(userLogged, user_token);
          await updateUserAndToken(userLogged, user_token);
          setFavorites(userLogged.favorites);
          // console.info("[LOGGED] ===>> ", userLogged, user_token);
        }
      }
      if (!!response) setIsLoading(false);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoading(true);

      const userLogged = await getStorageUser();
      const token = await getStorageAuthToken();

      if (userLogged && token) {
        updateUserAndToken(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  async function handleChangeAvatar({
    imageUri,
    clientId,
  }: IUploadAvatar): Promise<void> {
    let updatedUser: IUserLoggedInfo;

    try {
      const response = await FileSystem.uploadAsync(
        API_URL.concat("clients/update_avatar_app_v1"),
        imageUri,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "upload_file",
          mimeType: "image/jpeg",
          httpMethod: "POST",
          parameters: {
            id: clientId,
          },
        }
      );
      const { status } = response;
      if (status === 200) {
      }
    } catch (error) {}

    if (user) {
      updatedUser = {
        ...user,
        avatarUrl: imageUri,
      };

      setUser(updatedUser);
    }
  }

  async function updateFavorites(favorites: IOffersDTO[]) {
    const newData = {
      id_: user.id,
      email: user.email,
      name: user.name,
      favorites: JSON.stringify(favorites),
    };

    if (user.born)
      Object.assign(newData, {
        ...newData,
        born_date: user.born,
      });

    if (user.gender)
      Object.assign(newData, {
        ...newData,
        gender: user.gender,
      });

    if (user.phone)
      Object.assign(newData, {
        ...newData,
        telephone: user.phone,
      });

    if (user.fromCompany)
      Object.assign(newData, {
        ...newData,
        company_id: user.fromCompany,
      });

    try {
      await fetchApi({
        url: "clients/update_app_v1",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: newData,
        onError: (err) => {
          console.log("[UPDATE FAVORITES ERROR]", err);
        },
        onSuccess: async (res) => {
          if (res.status === "SUCCESS")
            setUser({
              ...user,
              favorites,
            });
        },
      });
    } catch (error) {
      console.log("[CATCH UPDATE FAVORITES ERROR]", error);
    }
  }

  function handleFavorited(offerToFavorite: IOffersDTO) {
    const hasFavorited = !!favorites.find(
      (item) => item.offer.offer_id === offerToFavorite.offer.offer_id
    );

    if (hasFavorited) {
      const filteredFavorites = favorites.filter(
        (item) => item.offer.offer_id !== offerToFavorite.offer.offer_id
      );
      setFavorites(filteredFavorites);

      updateFavorites(filteredFavorites);
    }
    if (!hasFavorited) {
      setFavorites([...favorites, offerToFavorite]);
      updateFavorites([...favorites, offerToFavorite]);
    }
  }

  function getFavoritedList(): IFavorite[] {
    const favoritedList: IFavorite[] = favorites.map((item) => {
      return {
        promoId: item.offer.offer_id,
        title: item.offer.offer_titulo,
        description: item.offer.offer_descricao,
        imageUrl: item.offer.offer_imagem,
      };
    });

    return favoritedList;
  }

  function thisOfferIsFavorited(offerId: string): boolean {
    if (favorites.length > 0) {
      const isFavorited = !!favorites.find(
        (item) => item.offer.offer_id === offerId
      );
      return isFavorited;
    }
    return false;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        userToken,
        isLoading,
        logout,
        updateProfile,
        handleChangeAvatar,
        handleFavorited,
        favorites,
        getFavoritedList,
        thisOfferIsFavorited,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
