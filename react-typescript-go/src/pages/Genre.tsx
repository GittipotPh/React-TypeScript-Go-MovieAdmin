import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { type Genre } from "./outlets/Movie";
import styled from "styled-components";

import OneGenre from "../components/OneGenre";

const StyledGenreDiv = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  column-gap: 1.2rem;
  row-gap: -0.2rem;
  background-color: var(--color-grey-200);
`;

const StyledGenreMenu = styled.div`
  display: flex;
  gap: 1rem;
  background-color: var(--color-grey-400);
  padding: 1rem 2rem;
  justify-content: center;
`;

export default function Genre() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string>("");
  const { id } = useParams();

  const genreID = id ? Number(id) : 0;

  useEffect(() => {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: header
    };

    fetch(`http://localhost:8080/genres`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          console.log(data);
          setGenres(data);
        }
      });
  }, []);

  if (error.length > 0)
    return (
      <div>
        <p>No Genres</p>
      </div>
    );

  return (
    <>
      <StyledGenreMenu>
        {genres.map((g) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to={`/app/genre/${g.id}`}
            key={g.id}
            state={{ genreName: g.genre }}
          >
            {g.genre}
          </NavLink>
        ))}
      </StyledGenreMenu>
      {genreID > 0 && (
        <StyledGenreDiv>
          <OneGenre />
        </StyledGenreDiv>
      )}
    </>
  );
}
