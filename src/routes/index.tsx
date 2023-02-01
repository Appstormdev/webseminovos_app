import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { AuthContext } from "@context/AuthContext";
import { useContext } from "react";

export function Routes() {
  const contextData = useContext(AuthContext);
  console.log(contextData);
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}
