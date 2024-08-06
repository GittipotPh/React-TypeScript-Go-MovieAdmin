import { HiMoon, HiSun } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../contexts/AppContext/useAppContext";
import { useAuth } from "../contexts/AuthContext/useAuth";
import { useTheme } from "../contexts/ThemeContext";
import Button from "./Button";
import { FlexContainer } from "./FlexContainer";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-grey-100);
  padding: 0.5rem;
`;

export default function MainHeader() {
  const { theme, toggleTheme } = useTheme();
  const { setJwtToken, toggleRefresh } = useAuth();
  const navigate = useNavigate();
  const { setComponentOn } = useAppContext();

  function handleToggle() {
    toggleTheme();
  }

  async function handleLogout() {
    if (window.confirm("Are you sure you want to log out?")) {
      const requestOptions = {
        method: "GET",

        credentials: "include" as RequestCredentials
      };

      try {
        await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/logout`,
          requestOptions
        );

        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        setJwtToken("");
        toggleRefresh(false);
      }
    }
  }

  return (
    <Header>
      <FlexContainer gap={0.5} marginright={1}>
        <Button
          btn="link"
          to="/app/home"
          onClick={() => setComponentOn("allMovies")}
        >
          Home
        </Button>

        <Button
          btn="link"
          to="/app/movies"
          onClick={() => setComponentOn("default")}
        >
          Movies
        </Button>
        <Button
          btn="link"
          to="/app/genre"
          onClick={() => setComponentOn("genres")}
        >
          Genres
        </Button>
        <Button
          btn="link"
          to="/app/search"
          onClick={() => setComponentOn("adminSearch")}
        >
          Add Movie
        </Button>
        <Button
          btn="link"
          to="/app/admin/movies/0"
          onClick={() => setComponentOn("manageCatalog")}
        >
          Manage Catalogue
        </Button>
        {/* <Button btn="link" to="/about">
          GraphQL
        </Button> */}
      </FlexContainer>
      <FlexContainer gap={1.5} marginright={1}>
        <img
          className="profile-img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkUa1r67PloUw5K6xAqEhVNZZ7vi32v2Z_6Q&s"
          alt="shiba tatsuya"
        />
        <Button btn="link" onClick={handleToggle}>
          {theme === "dark" ? (
            <HiMoon className="icon-darkmode" />
          ) : (
            <HiSun className="icon-lightmode" />
          )}
        </Button>
        {/* <Button btn="link" onClick={toggleRefresh}>
          {theme === "dark" ? (
            <HiAcademicCap className="icon-darkmode" />
          ) : (
            <HiTag className="icon-lightmode" />
          )}
        </Button> */}
        <Button btn="confirm" onClick={handleLogout}>
          Log Out
        </Button>
      </FlexContainer>
    </Header>
  );
}
