import { createContext, ReactNode, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

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
import { apiMultiForm } from "@services/api";
import { formatDistanceToNow, parseJSON } from "date-fns";
import { ptBR } from "date-fns/locale";
import { create } from "yup/lib/Reference";

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
};

type IUserLoggedInfo = {
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
};

export type AuthContextDataProps = {
  user: UserProps;
  userToken: string;
  isLoadingUserToken: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
  handleChangeAvatar: (avatarUrl: string) => void;
  handleFavorited: (offer: IOffersDTO) => void;
  favorites: IOffersDTO[];
  getFavoritedList: () => IFavorite[];
  thisOfferIsFavorited: (offerId: string) => boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

//TODO: remover ao integrar com o backend
let tokenTest = "apenasUmTesteDeToken";

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [userToken, setUserToken] = useState<string>("");
  const [isLoadingUserToken, setIsLoadingUserToken] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<IOffersDTO[]>([]);

  async function updateUserAndToken(userData: UserProps, token: string) {
    //TODO: Atualizar o cabeçalho da requisição backend
    setUser(userData);
    setUserToken(token);
  }

  async function saveStorageUserAndToken(userData: UserProps, token: string) {
    try {
      setIsLoadingUserToken(true);

      await saveStorageUser(userData);
      await saveStorageAuthToken(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserToken(false);
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
      setUser({} as UserProps);
      setUserToken("");
      setFavorites([] as IOffersDTO[]);
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      setIsLoadingUserToken(true);

      await removeStorageUserAndToken();
      clearAllState();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserToken(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingUserToken(true);
      const loginData = {
        email: email,
        password: password,
      };

      const response = await apiMultiForm.post(`auth/login_client`, loginData);

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
        } = userInfo as IUserInfoDTO;
        //TODO: remove replace from avatar when production
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
        };

        if (!!userLogged) {
          await saveStorageUserAndToken(userLogged, user_token);
          await updateUserAndToken(userLogged, user_token);
          console.info("[LOGGED] ===>> ", userLogged, user_token);
        }
      }
      if (!!response) setIsLoadingUserToken(false);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserToken(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserToken(true);

      const userLogged = await getStorageUser();
      const token = await getStorageAuthToken();

      if (userLogged && token) {
        updateUserAndToken(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserToken(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  function handleChangeAvatar(avatarUrl: string) {
    let updatedUser: UserProps;

    if (user) {
      updatedUser = {
        ...user,
        avatarUrl,
      };

      setUser(updatedUser);
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
    }
    if (!hasFavorited) {
      setFavorites([...favorites, offerToFavorite]);
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
    const isFavorited = !!favorites.find(
      (item) => item.offer.offer_id === offerId
    );
    return isFavorited;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        userToken,
        isLoadingUserToken,
        logout,
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
