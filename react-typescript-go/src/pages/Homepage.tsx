import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Movie } from "./ManageCatalogue";

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

export type MovieAllAPI = {
  id: number;
  original_title: string;
  release_date: string;
  runtime: number;
  mpaa_rating: string;
  overview: string;
  poster_path: string;
};

const apiKey = "941b0c820f7684ee1e59fc2771625302";

export default function HomeSearch() {
  const [searchTerm, setSearchTerm] = useState("Spiderman");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [startSearch, setStartSearch] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm.length < 3) return;

    async function searchMovies() {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;

      try {
        const res = await axios.get(url);
        const data = res.data;
        console.log(data);
        const movieResults: Movie[] = data.results.map(
          (movie: MovieAllAPI) => ({
            id: movie.id,
            title: movie.original_title,
            release_date: movie.release_date,
            runtime: 0,
            mpaa_rating: "",
            description: movie.overview,
            image: movie.poster_path
          })
        );
        setMovies(movieResults);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    searchMovies();
  }, [searchTerm, startSearch]);

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
                <p>Movie:ID {movie.id}</p>
              </div>
              <p className="movie-description">{movie.description}</p>
            </div>
          </PostCardMovie>
        ))}
      </div>
    </>
  );
}
