import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContext/AppProvider";
import { AuthProvider } from "./contexts/AuthContext/AuthProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";
import Aboutpage from "./pages/Aboutpage";
import AppLayout from "./pages/AppLayout";
import EditMovie from "./pages/EditMovie";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/Homepage";
import MainLogin from "./pages/MainLogin";
import ManageCatalogue from "./pages/ManageCatalogue";

import Movie from "./pages/outlets/Movie";
import GlobalStyles from "./themes/GlobalStyle";
import ShowMoviesList from "./pages/outlets/ShowMoviesList";
import Genre from "./pages/Genre";
import AdminSearch from "./pages/AddMovieFromAPI";
import SignUpForm from "./pages/SignUpForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/genres",
    element: <Aboutpage />,
    errorElement: <ErrorPage />
  },

  {
    path: "/login",
    element: <MainLogin />,
    errorElement: <ErrorPage />
  },
  {
    path: "/register",
    element: <SignUpForm />,
    errorElement: <ErrorPage />
  },
  {
    path: "/app",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "movies",
        element: <ShowMoviesList />,
        errorElement: <ErrorPage />
      },
      {
        path: "home",
        element: <Homepage />,
        errorElement: <ErrorPage />
      },
      {
        path: "search",
        element: <AdminSearch />,
        errorElement: <ErrorPage />
      },

      {
        path: "movies/:id",
        element: <Movie />,
        errorElement: <ErrorPage />
      },
      {
        path: "admin/movies/",
        element: <ManageCatalogue />,
        errorElement: <ErrorPage />
      },
      {
        path: "admin/movies/:id",
        element: <EditMovie />,
        errorElement: <ErrorPage />
      },
      {
        path: "genre",
        element: <Genre />,
        errorElement: <ErrorPage />
      },
      {
        path: "genre/:id",
        element: <Genre />,
        errorElement: <ErrorPage />
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <GlobalStyles />
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
