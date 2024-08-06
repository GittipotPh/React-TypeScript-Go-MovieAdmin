import { Outlet } from "react-router-dom";
import {
  ExternalContainer,
  MainContainer,
  MainContainer2,
  MainContainer3
} from "../components/Container";
import MainHeader from "../components/MainHeader";
import { useAuth } from "../contexts/AuthContext/useAuth";
import MovieLeftApp from "./outlets/Movies";
import { useAppContext } from "../contexts/AppContext/useAppContext";
import ManageCatalogue from "./ManageCatalogue";
import Genre from "./Genre";
import HomeSearch from "./Homepage";
import AdminSearch from "./AddMovieFromAPI";

export default function AppLayout() {
  const { jwtToken, setJwtToken } = useAuth();
  const { componentOn } = useAppContext();

  return (
    <ExternalContainer>
      <MainHeader />
      <MainContainer>
        {componentOn === "genres" && (
          <MainContainer2>
            <Genre />
          </MainContainer2>
        )}
        {componentOn === "allMovies" && (
          <MainContainer2>
            <HomeSearch />
          </MainContainer2>
        )}
        {componentOn === "adminSearch" && (
          <MainContainer2>
            <AdminSearch />
          </MainContainer2>
        )}
        {(componentOn === "manageCatalog" ||
          componentOn === "manageCatalog2") && (
          <MainContainer3>
            <ManageCatalogue />
          </MainContainer3>
        )}
        {/* {componentOn === "editCatalog" && <ManageCatalogue />} */}

        {componentOn === "default" && <MovieLeftApp />}
        {/* <ManageCatalogue /> */}

        {(componentOn === "default" ||
          componentOn === "manageCatalog" ||
          componentOn === "manageCatalog2") && (
          <div>
            <Outlet context={{ jwtToken, setJwtToken }} />
          </div>
        )}
        {/* {componentOn === "editCatalog" && (
          <MainContainer2>
            <EditMovie />
          </MainContainer2>
        )} */}
      </MainContainer>
    </ExternalContainer>
  );
}
