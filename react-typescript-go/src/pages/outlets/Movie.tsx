import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledMovieDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-grey-200);
  color: var(--color-grey-800);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(126, 115, 115, 0.8);
  overflow-y: scroll;

  h2 {
    font-size: 3.2rem;
    color: var(--color-indigo-700);
    margin-bottom: 1.8rem;
  }

  h3 {
    font-size: 2.4rem;
    color: var(--color-indigo-500);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.8rem;
    margin: 0.5rem 0;
  }

  span {
    display: inline-block;
    background-color: var(--color-grey-300);
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    margin: 0.25rem;
    font-size: 1.2rem;
  }

  hr {
    width: 100%;
    border: 0;
    height: 1px;
    background-color: var(--color-grey-400);
    margin: 2rem 0;
  }

  img {
    max-width: 24rem;
    width: 24rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
    box-shadow: 0 4px 5px 4px rgba(128, 95, 95, 0.4);
  }

  .description {
    font-size: 1rem;
    line-height: 1.5;
    text-align: justify;
    margin: 1rem 0;
  }
`;

type ParamsId = {
  id: string;
};

export type Genre = {
  id: number;
  genre: string;
  checked: boolean;
};

export type MovieType = {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  mpaa_rating: string;
  description: string;
  image: string;
  genres: Genre[];
};

export default function Movie() {
  const [movie, setMovie] = useState<MovieType | null>(null);
  const { id } = useParams<ParamsId>();

  useEffect(() => {
    async function getMovie() {
      try {
        const header = new Headers();
        header.append("Content-Type", "application/json");

        const requestOptions = {
          method: "GET",
          headers: header
        };

        const res = await fetch(
          `http://localhost:8080/movies/${id}`,
          requestOptions
        );

        const data = await res.json();
        console.log(data);

        const movie: MovieType = {
          id: data.id,
          title: data.title,
          release_date: data.release_date,
          runtime: data.runtime,
          mpaa_rating: data.mpaa_rating,
          description: data.Description,
          image: data.image,
          genres: data.genres || []
        };

        console.log(movie);

        setMovie(movie);
      } catch (err) {
        console.log(err);
      }
    }

    getMovie();
  }, [id]);

  return (
    <StyledMovieDiv>
      <h2>{movie?.title}</h2>
      <h3>Movie ID: {id}</h3>
      <p>Release Date: {movie?.release_date}</p>
      <p>Runtime: {movie?.runtime} minutes</p>
      <p>Rating: {movie?.mpaa_rating}</p>
      <div>
        {movie?.genres.map((g) => (
          <span key={g.id}>{g.genre}</span>
        ))}
      </div>
      <hr />
      {movie?.image && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie?.image}`}
            alt={movie?.title}
          />
        </div>
      )}
      <div className="description">{movie?.description}</div>
    </StyledMovieDiv>
  );
}
