import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("Auth provider is undefined");

  return context;
}

export { useAuth };
