import { createContext, ReactNode, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { storeUserToken, getUserToken } from "@storage/storageUserToken";

export type AuthContextDataProps = {
  user: UserDTO;
  userToken: string;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({} as UserDTO);
  const [userToken, setUserToken] = useState("");

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
    setUserToken("teste");
    storeUserToken("teste");
  }

  function logout() {
    setUserToken("");
    storeUserToken("");
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

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        userToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
