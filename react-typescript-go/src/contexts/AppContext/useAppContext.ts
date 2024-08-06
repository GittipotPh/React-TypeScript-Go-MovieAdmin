import { useContext } from "react";
import { AppContext } from "./AppContextType";

function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error("Context is undefined");
  return context;
}

export { useAppContext };
