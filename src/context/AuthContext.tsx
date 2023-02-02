import { createContext, ReactNode, useEffect, useState } from "react";

import { storeUserToken, getUserToken } from "@storage/storageUserToken";
import { OffersDTO } from "@dtos/OffersDTO";

type UserProps = {
  name: string;
  email: string;
  phone: string;
  born: string;
  gender: string;
  avatarUrl: string;
};

export type AuthContextDataProps = {
  user: UserProps | null;
  userToken: string;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
  handleChangeAvatar: (avatarUrl: string) => void;
  handleFavorited: (offer: OffersDTO) => void;
  favorites: OffersDTO[];
  thisOfferIsFavorited: (offerId: string) => boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [userToken, setUserToken] = useState<string>("");
  const [favorites, setFavorites] = useState<OffersDTO[]>([]);

  async function signIn(email: string, password: string) {
    console.log(email, password);

    //TODO: Pegar a rota de login de cliente
    /**
    try {
      const { data } = await api.post("", { email, password });
      
      if (data.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }
    } catch (error) {
      throw error;
    }
  */

    setUser({
      name: "Alice Megan",
      email: "alice.magan@mail.com",
      phone: "11999019901",
      born: "2001-06-15",
      gender: "female",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    });
    setUserToken("teste");
    storeUserToken("teste");
  }

  function logout() {
    setUser(null);
    setUserToken("");
    storeUserToken("");
    setFavorites([]);
  }

  async function loadUserToken() {
    const userToken = await getUserToken();

    if (userToken) {
      setUserToken(userToken);
    }
  }

  useEffect(() => {
    loadUserToken();
  }, []);

  useEffect(() => {
    if (user === null) logout();
  }, [user]);

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
        logout,
        handleChangeAvatar,
        handleFavorited,
        favorites,
        thisOfferIsFavorited,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
