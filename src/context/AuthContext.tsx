import { createContext, ReactNode, useEffect, useState } from "react";

import {
  saveStorageUser,
  getStorageUser,
  removeStorageUser,
} from "@storage/storageUser";
import { OffersDTO } from "@dtos/OffersDTO";
import {
  getStorageAuthToken,
  removeStorageAuthToken,
  saveStorageAuthToken,
} from "@storage/storageAuthToken";

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

export type AuthContextDataProps = {
  user: UserProps;
  userToken: string;
  isLoadingUserToken: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
  handleChangeAvatar: (avatarUrl: string) => void;
  handleFavorited: (offer: OffersDTO) => void;
  favorites: OffersDTO[];
  getFavoritedList: () => IFavorite[];
  thisOfferIsFavorited: (offerId: string) => boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

//TODO: Remover ao integrar com o backend
let userTest = {
  name: "Alice Megan",
  email: "alice.magan@mail.com",
  phone: "11999019901",
  born: "2001-06-15",
  gender: "female",
  avatarUrl:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
};

//TODO: remover ao integrar com o backend
let tokenTest = "apenasUmTesteDeToken";

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [userToken, setUserToken] = useState<string>("");
  const [isLoadingUserToken, setIsLoadingUserToken] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<OffersDTO[]>([]);

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
      setFavorites([] as OffersDTO[]);
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

      //TODO: fazer integração com o backend

      //TODO: trocar userTest e tokenTest pelos valores que vierem do backend
      if (userTest && tokenTest) {
        await saveStorageUserAndToken(userTest, tokenTest);
        await updateUserAndToken(userTest, tokenTest);
      }
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

  function handleFavorited(offer: OffersDTO) {
    const hasFavorited = !!favorites.find((item) => item.id === offer.id);

    if (hasFavorited) {
      const filteredFavorites = favorites.filter(
        (item) => item.id !== offer.id
      );
      setFavorites(filteredFavorites);
    }
    if (!hasFavorited) setFavorites([...favorites, offer]);
  }

  function getFavoritedList(): IFavorite[] {
    const favoritedList: IFavorite[] = favorites.map((item) => {
      return {
        promoId: item.id,
        title: item.titulo_oferta,
        description: item.descricao_oferta,
        imageUrl: item.imagem_oferta,
      };
    });

    return favoritedList;
  }

  function thisOfferIsFavorited(offerId: string): boolean {
    const isFavorited = !!favorites.find((item) => item.id === offerId);
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
