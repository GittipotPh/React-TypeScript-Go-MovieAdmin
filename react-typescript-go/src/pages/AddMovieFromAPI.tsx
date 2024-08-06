import { useEffect, useState } from "react";
import styled from "styled-components";
import { Movie } from "./ManageCatalogue";
import { MovieAllAPI } from "./Homepage";
import { useAuth } from "../contexts/AuthContext/useAuth";
import Swal from "sweetalert2";

function formatDate(dateString: string): string {
  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[2], 10);
  const d = new Date(year, month, day);

  const formattedDate = d.toISOString();

  return formattedDate;
}

const PostCardMovie = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  display: flex;
  align-items: center;
  background-color: var(--color-grey-400);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;

  img {
    border-radius: 8px;
    max-width: 20rem;
    margin-right: 3.2rem;
  }

  .movie-details {
    display: flex;
    flex-direction: column;
  }

  .movie-title {
    font-size: 3.2rem;
    margin: 0 0 8px;
  }

  .movie-info {
    font-size: 1.8rem;
    color: var(--color-grey-800);
  }

  .movie-description {
    margin-top: 0.8rem;
    font-size: 1.5rem;
    color: var(--color-grey-800);
    width: 40%;
  }
`;

const StyledDetail = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 10rem;
  padding-right: 2rem;
`;

const StyleButton = styled.div`
  button {
    color: var(--color-grey-800);
    background-color: var(--color-grey-300);
  }
`;

export default function AdminSearch() {
  const [searchTerm, setSearchTerm] = useState("Spiderman");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [startSearch, setStartSearch] = useState<boolean>(false);
  const { jwtToken } = useAuth();

  async function handleSubmit(index: number) {
    const url = `http://localhost:8080/admin/movies`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + jwtToken);

    movies[index].release_date = formatDate(movies[index].release_date);
    movies[index].runtime = Number(movies[index].runtime);

    const requestOptions = {
      method: "PUT",
      headers: headers,
      credentials: "include" as RequestCredentials,
      body: JSON.stringify(movies[index])
    };

    const result = await fetch(url, requestOptions);
    if (result.status != 202) {
      Swal.fire({
        icon: "error",
        title: "You need to login first"
      });

      return;
    }

    console.log(result);
    let timerInterval: ReturnType<typeof setInterval>;
    Swal.fire({
      icon: "success",
      title: "Movie Saved!",
      // html: "Closing in <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      customClass: {
        popup: "animated tada", // Optional: adding some animation class
        timerProgressBar: "my-custom-timer"
      },
      didOpen: () => {
        Swal.showLoading();
        const popup = Swal.getPopup();
        if (popup) {
          // Ensure the popup is not null
          const timer = popup.querySelector("b");
          if (timer) {
            // Ensure the timer is not null
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          }
        }
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("Movie save confirmation closed by the timer");
      }
    });
  }

  useEffect(() => {
    if (searchTerm.length < 4) return;

    async function searchMovies() {
      const url = `http://localhost:8080/movies/search`;
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", "Bearer " + jwtToken);

      const requestOptions = {
        method: "POST",
        headers: headers,
        credentials: "include" as RequestCredentials,
        body: JSON.stringify({ search_str: searchTerm })
      };

      try {
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        console.log(data);
        const movieResults: Movie[] = data.map((movie: MovieAllAPI) => ({
          id: movie.id,
          title: movie.original_title,
          release_date: movie.release_date,
          runtime: 0,
          mpaa_rating: "",
          description: movie.overview.slice(0, 250),
          image: movie.poster_path
        }));
        setMovies(movieResults);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    searchMovies();
  }, [searchTerm]);

  return (
    <>
      <div className="input-text">
        <h2>ALL MOVIES</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setStartSearch(!startSearch)}>Search</button>
      </div>

      <div>
        {movies.map((movie, i) => (
          <PostCardMovie key={i}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie?.image}`}
              alt={movie.title}
            />
            <StyledDetail>
              <div className="movie-details">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-info">
                  <p>Release Date: {movie.release_date}</p>
                  <p>Runtime: {movie.runtime} minutes</p>
                  <p>MPAA Rating: {movie.mpaa_rating}</p>
                  <p>Movie:ID {movie.id}</p>
                </div>
                <p className="movie-description">{movie.description}</p>
              </div>
              <StyleButton>
                <button onClick={() => handleSubmit(i)}>ADD</button>
              </StyleButton>
            </StyledDetail>
          </PostCardMovie>
        ))}
      </div>
    </>
  );
}
