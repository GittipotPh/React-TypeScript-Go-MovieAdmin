import { createContext, Dispatch, SetStateAction } from "react";

export type AppContextType = {
  componentOn:
    | "manageCatalog"
    | "editCatalog"
    | "default"
    | "manageCatalog2"
    | "genres"
    | "allMovies"
    | "adminSearch";
  setComponentOn: Dispatch<
    SetStateAction<
      | "manageCatalog"
      | "editCatalog"
      | "default"
      | "manageCatalog2"
      | "genres"
      | "allMovies"
      | "adminSearch"
    >
  >;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export { AppContext };
