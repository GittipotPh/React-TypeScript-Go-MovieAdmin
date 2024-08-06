// import {
//   createContext,
//   Dispatch,
//   SetStateAction,
//   useContext,
//   ReactNode,
//   useState
// } from "react";

// type AuthContextType = {
//   jwtToken: string;
//   setJwtToken: Dispatch<SetStateAction<string>>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// function AuthProvider({ children }: { children: ReactNode }) {
//   const [jwtToken, setJwtToken] = useState<string>("");

//   return (
//     <AuthContext.Provider value={{ jwtToken, setJwtToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) throw new Error("Auth provider is undefined");

//   return context;
// }

// export { AuthProvider, useAuth };
