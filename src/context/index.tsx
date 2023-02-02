import { ReactNode } from "react";
import { AuthContextProvider } from "./AuthContext";
import { OffersContextProvider } from "./OffersContext";

interface AppContextProvidersProps {
  children: ReactNode;
}

export function AppContextProviders({ children }: AppContextProvidersProps) {
  return (
    <AuthContextProvider>
      <OffersContextProvider>
        <>{children}</>
      </OffersContextProvider>
    </AuthContextProvider>
  );
}
