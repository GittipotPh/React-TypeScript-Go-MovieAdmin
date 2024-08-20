import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonLinkMovie from "../components/ButtonLinkMovie";
import { useAuth } from "../contexts/AuthContext/useAuth";
import { useAppContext } from "../contexts/AppContext/useAppContext";

const StyleCatalogue = styled.div`
  background-color: var(--color-grey-200);
  height: 100%;
  width: 100%;
  padding: 1rem;
  border: 0.7rem solid var(--color-grey-600);
  border-radius: 0.5rem;
  color: var(--color-grey-800);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .input-text {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    input {
      margin-right: 0.5rem;
      padding: 0.5rem;
      border: 1px solid var(--color-grey-600);
      border-radius: 0.25rem;
      flex: 1;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.25rem;
      background-color: var(--color-indigo-700);
      color: #fff;
      cursor: pointer;

      &:hover {
        background-color: var(--color-indigo-600);
      }
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    table-layout: fixed;

    th,
    td {
      border: 1px solid var(--color-grey-800);
      padding: 0.5rem;
      text-align: left;
      word-wrap: break-word;
    }

    th {
      background-color: var(--color-grey-100);
    }
    th:nth-child(1) {
      width: 15%;
    }
    th:nth-child(3) {
      width: 5%;
    }
    th:nth-child(2) {
      width: 15%;
    }
    th:nth-child(4) {
      width: 10%;
      text-align: center;
    }

    tr:nth-child(even) {
      background-color: var(--color-grey-200);
    }

    a {
      color: var(--color-indigo-700);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    img {
      max-width: 200px;
      width: 15rem;
      height: 10rem;
      display: block;
    }
  }

  @media (max-width: 700px) {
    table {
      font-size: 0.875rem;
    }

    .input-text {
      flex-direction: column;

      input {
        margin-bottom: 0.5rem;
        width: 80%;
      }
    }
  }
`;

export type Movie = {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  mpaa_rating: string;
  description: string;
  image: string;
};

export default function ManageCatalogue() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchedMovie, setSearchedMovie] = useState<Movie[]>([]);

  const { jwtToken } = useAuth();
  const { componentOn } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (search.length < 3) return;
    const searchedMovies = movies.filter((movie) =>
      movie.title.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedMovie(searchedMovies);
  }, [search, movies]);

  useEffect(() => {
    async function fetchMovies() {
      console.log("JWTOKEN fetch catalogue", jwtToken);
      if (jwtToken === "") {
        navigate("/login");
        return;
      }
      try {
        const header = new Headers();
        header.append("Content-Type", "application/json");
        header.append("Authorization", `Bearer ${jwtToken}`);

        const requestOptions = {
          method: "GET",
          headers: header
        };

        const res = await fetch(
          `http://localhost:8080/admin/movies`,
          requestOptions
        );
        if (!res.ok) {
          throw new Error("Network response error");
        }

        const movies: Movie[] = await res.json();
        console.log(movies);
        setMovies(movies);
      } catch (err) {
        console.log(err);
      }
    }

    fetchMovies();
  }, [jwtToken, navigate, componentOn]);

  return (
    <StyleCatalogue>
      <div className="input-text">
        <h2>Manage Catalogue</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>

      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Release Date</th>
            <th>Rating</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {(search.length < 3 ? movies : searchedMovie).map((movie) => (
            <tr key={movie.id}>
              <td>
                <ButtonLinkMovie
                  btn="link"
                  to={`/app/admin/movies/${movie.id}`}
                >
                  {movie.title}
                </ButtonLinkMovie>
              </td>
              <td>{movie.release_date}</td>
              <td>{movie.mpaa_rating}</td>
              <td>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie?.image}`}
                  alt={movie.title}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyleCatalogue>
  );
}
