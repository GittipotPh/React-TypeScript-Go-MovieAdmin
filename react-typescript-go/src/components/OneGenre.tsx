import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../contexts/AppContext/useAppContext";
import { Movie } from "../pages/ManageCatalogue";

const PostCardMovie = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  display: flex;
  align-items: center;
  background-color: var(--color-grey-400);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    border-radius: 8px;
    max-width: 150px;
    margin-right: 16px;
  }

  .movie-details {
    display: flex;
    flex-direction: column;
  }

  .movie-title {
    font-size: 1.8rem;
    margin: 0 0 8px;
  }

  .movie-info {
    font-size: 1rem;
    color: var(--color-grey-800);
  }

  .movie-description {
    margin-top: 8px;
    font-size: 0.9rem;
    color: var(--color-grey-800);
  }
`;

export default function OneGenre() {
  const location = useLocation();
  const { genreName } = location.state;
  const { setComponentOn } = useAppContext();

  const [movies, setMovies] = useState<Movie[]>([]);

  const { id } = useParams();

  useEffect(() => {
    async function GetMovieByGenre() {
      try {
        const header = new Headers();
        header.append("Content-Type", "application/json");

        const requestOptions = {
          method: "GET",
          headers: header
        };

        const res = await fetch(
          `http://localhost:8080/movies/genres/${id}`,
          requestOptions
        );
        if (!res.ok) {
          console.log("Fetching movie by genre failed");
        } else {
          const data: Movie[] = await res.json();
          setMovies(data);
          setComponentOn("genres");
        }
      } catch (err) {
        console.log(err);
      }
    }

    GetMovieByGenre();
  }, [id, setComponentOn]);

  return (
    <>
      <h2>Genre: {genreName}</h2>

      {movies.map((movie) => (
        <PostCardMovie key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie?.image}`}
            alt={movie.title}
          />
          <div className="movie-details">
            <h3 className="movie-title">{movie.title}</h3>
            <div className="movie-info">
              <p>Release Date: {movie.release_date}</p>
              <p>Runtime: {movie.runtime} minutes</p>
              <p>MPAA Rating: {movie.mpaa_rating}</p>
            </div>
            <p className="movie-description">{movie.description}</p>
          </div>
        </PostCardMovie>
      ))}
    </>
  );
}
