import { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonLinkMovie from "../../components/ButtonLinkMovie";
import { MovieType } from "./Movie";
import { useNavigate } from "react-router-dom";

const StyleLeftApp = styled.div`
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
      max-width: 100px;
      height: auto;
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

export default function MovieLeftApp() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchedMovie, setSearchedMovie] = useState<MovieType[]>([]);
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
      try {
        const header = new Headers();
        header.append("Content-Type", "application/json");

        const requestOptions = {
          method: "GET",
          headers: header
        };

        const res = await fetch(`http://localhost:8080/movies`, requestOptions);
        if (!res.ok) {
          throw new Error("Network response error");
        }

        const movies: MovieType[] = await res.json();
        console.log(movies);
        setMovies(movies);

        const randomMovie = Math.round(Math.random() + 1) * movies.length;

        setTimeout(() => {
          navigate(`/app/movies/${randomMovie}`, { replace: true });
        }, 500);
      } catch (err) {
        console.log(err);
      }
    }

    fetchMovies();
  }, [navigate]);

  return (
    <StyleLeftApp>
      <div className="input-text">
        <h2>MOVIES</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Release Date</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {(search.length > 3 ? searchedMovie : movies).map((movie) => (
            <tr key={movie.id}>
              <td>
                <ButtonLinkMovie btn="link" to={`/app/movies/${movie.id}`}>
                  {movie.title}
                </ButtonLinkMovie>
              </td>
              <td>{movie.release_date}</td>
              <td>{movie.mpaa_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyleLeftApp>
  );
}
