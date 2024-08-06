import { ReactNode, useState } from "react";
import { AppContext } from "./AppContextType";

type ComponentOnType =
  | "manageCatalog"
  | "editCatalog"
  | "default"
  | "manageCatalog2"
  | "genres"
  | "allMovies"
  | "adminSearch";

function AppContextProvider({ children }: { children: ReactNode }) {
  const [componentOn, setComponentOn] = useState<ComponentOnType>("default");

  return (
    <AppContext.Provider value={{ componentOn, setComponentOn }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider };
