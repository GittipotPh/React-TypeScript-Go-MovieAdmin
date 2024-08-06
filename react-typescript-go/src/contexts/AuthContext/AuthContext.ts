import { createContext, Dispatch, SetStateAction } from "react";

export type AuthContextType = {
  jwtToken: string;
  setJwtToken: Dispatch<SetStateAction<string>>;
  toggleRefresh: (status: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };
