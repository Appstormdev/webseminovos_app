import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          userId: "1",
          name: "Ricardo Granvilla Oliveira",
          email: "rgranvilla@gmail.com",
          phone: "51992051821",
          born: "1981-05-05",
          gender: "male",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
