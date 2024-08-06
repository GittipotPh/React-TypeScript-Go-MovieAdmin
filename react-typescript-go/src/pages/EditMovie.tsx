import React, { FormEvent, useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import { useAuth } from "../contexts/AuthContext/useAuth";
import { type Genre } from "./outlets/Movie";
import Checkbox from "../components/CheckBox";
import Swal from "sweetalert2";
import { useAppContext } from "../contexts/AppContext/useAppContext";
import Input2 from "../components/Input2";
import Button from "../components/Button";
import { ContainerFlex2 } from "../components/Container";

function formatDate(dateString: string): string {
  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[2], 10);
  const d = new Date(year, month, day);

  const formattedDate = d.toISOString();

  return formattedDate;
}

const StyledEditContainer = styled.div`
  display: grid;
  background-color: var(--color-grey-200);
  grid-template-columns: 2fr 1fr;
  height: 100%;
  width: 100%;
  padding: 1rem 0 0 0;
  border: 0.7rem solid var(--color-grey-600);
  border-radius: 0.5rem;
  color: var(--color-grey-800);
  align-content: center;
  place-items: center;
  padding: 0 2.5rem 0 2.5rem;
`;

const StyledH2 = styled.h2`
  grid-column: 1 / -1;
  margin-top: 1rem;
  margin-bottom: 2rem;
  align-self: baseline;
  border: 1px solid var(--color-grey-900);
  padding: 1rem 2rem;
  border-radius: 0.8rem;
`;

const CenteredForm = styled(Form)`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;

  width: 100%;
  align-content: center;
`;

const StyledFlexCheckBox = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
  place-content: center;
  padding-left: 3rem;
  margin-bottom: 2.5rem;
  border-left: 0.5rem solid var(--color-grey-900);
  margin-left: 2rem;
`;

const StyledFlex = styled.div`
  display: grid;
  align-items: center;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  margin-left: -4rem;
  width: 90%;
`;

type Error = string;

type MovieAdmin = {
  id?: number;
  title: string;
  release_date: string;
  runtime: number;
  mpaa_rating: string;
  description: string;
  image: string;
  genres: Genre[];
  genre_array: number[];
};

export default function EditMovie() {
  const { id } = useParams();
  const { setComponentOn } = useAppContext();
  const navigate = useNavigate();
  const { jwtToken } = useAuth();
  const [errors, setError] = useState<Error[]>([]);
  const [description, setDescription] = useState("");

  const movieId = id ? Number(id) : Number(0);

  // const [errors, setErrors] = useState<Error[]>([]);
  const [movie, setMovie] = useState<MovieAdmin>({
    title: "",
    release_date: "",
    runtime: 2,
    description: "2234",
    mpaa_rating: "",
    genres: [],
    image: "",
    genre_array: []
  });

  const mpaaOptions = [
    // { id: "none", value: "" },
    { id: "G", value: "G" },
    { id: "PG", value: "PG" },
    { id: "PG13", value: "PG13" },
    { id: "R", value: "R" },
    { id: "NC17", value: "NC17" },
    { id: "18A", value: "18A" }
  ];

  async function confirmDelete() {
    const result = await Swal.fire({
      title: "Delete movie?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
    if (result.isConfirmed) {
      const header = new Headers();

      header.append("Authorization", "Bearer " + jwtToken);

      const requestOptions = {
        method: "DELETE",
        headers: header,
        credentials: "include" as RequestCredentials
      };

      try {
        const res = await fetch(
          `http://localhost:8080/admin/movies/${movieId}`,
          requestOptions
        );
        if (!res.ok) {
          const data = await res.json();
          if (data.error) {
            console.log(data.error);
          } else {
            console.log("Failed to delete the movie");
          }
        } else {
          Swal.fire({
            title: "Deleted!",
            text: "movie has been deleted.",
            icon: "success"
          });
        }
        setComponentOn("manageCatalog2");
        navigate("/app/admin/movies/0");
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if (jwtToken === "") navigate("/login");

    const fetchGenres = async () => {
      if (movieId === 0) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
          method: "GET",
          headers: headers
        };

        try {
          const response = await fetch(
            "http://localhost:8080/genres",
            requestOptions
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("Fetched genres: ", data);

          const checks: Genre[] = data.map((g: Genre) => ({
            ...g,
            checked: false
          }));
          console.log("Fetched genres: ", checks);

          setMovie((prevmovie) => ({
            ...prevmovie,
            genres: checks
          }));

          console.log("Updated movie: ", movie);
        } catch (error) {
          console.error("Failed to fetch genres: ", error);
        }
      } else {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + jwtToken);

        const requestoptions = {
          method: "GET",
          headers: headers,
          includes: "include" as RequestCredentials
        };
        try {
          const res = await fetch(
            `http://localhost:8080/admin/movies/${movieId}`,
            requestoptions
          );
          if (res.status !== 200) {
            Swal.fire({
              title: "Error!",
              text: "Could not fetch movies from server",
              icon: "error",
              confirmButtonText: "Confirm"
            });
            return;
          }

          const data: { movie: MovieAdmin; genres: Genre[] } = await res.json();
          console.log(data);

          const movie: MovieAdmin = {
            id: data.movie.id,
            genre_array: data.movie.genre_array,
            title: data.movie.title,
            release_date: data.movie.release_date.split("T")[0],
            runtime: data.movie.runtime,
            mpaa_rating: data.movie.mpaa_rating,
            description: data.movie.description,
            image: data.movie.image,
            genres: data.genres
          };

          console.log(movie);

          const checks: Genre[] = [];

          data.genres.forEach((g: Genre) => {
            if (data.movie.genre_array.indexOf(g.id) !== -1) {
              checks.push({ id: g.id, checked: true, genre: g.genre });
            } else {
              checks.push({ id: g.id, checked: false, genre: g.genre });
            }
          });

          setMovie({ ...movie, genres: checks });
          setDescription(movie.description);

          console.log(movie);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchGenres();
  }, [navigate, movieId, jwtToken]);

  useEffect(() => {
    if (movie.description !== description) {
      console.log("Movie description updated:", movie.description);
      setMovie((prevMovie) => ({
        ...prevMovie,
        description: description
      }));
    }
  }, [description]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log("Movie state before submission: ", movie);

    const errors: Error[] = [];
    const required = [
      { field: movie.title, name: "title" },
      { field: movie.release_date, name: "release_date" },
      { field: movie.runtime, name: "runtime" },
      { field: movie.description, name: "description" },
      { field: movie.mpaa_rating, name: "mpaa_rating" }
    ];
    required.forEach(function (obj) {
      if (obj.field === "") {
        errors.push(obj.name);
      }
    });

    if (movie.genre_array.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "You must select a Genres at least one",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      });

      errors.push("genres");
    }

    setError(errors);

    if (errors.length > 0) return false;

    movie.release_date = formatDate(movie.release_date);
    movie.runtime = Number(movie.runtime);

    const header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + jwtToken);

    let method = "PUT";

    if (movieId > 0) {
      method = "PATCH";
    }

    const requestOptions = {
      method: method,
      headers: header,
      credentials: "include" as RequestCredentials,
      body: JSON.stringify(movie)
    };

    fetch(`http://localhost:8080/admin/movies/${movieId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
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

          setComponentOn("manageCatalog2");
          navigate(`/app/admin/movies/0`);
          setMovie({
            title: "",
            release_date: "",
            runtime: 100,
            description: "",
            mpaa_rating: "",
            genres: movie.genres,
            image: "",
            genre_array: []
          });
          setDescription("");
        }
      })
      .catch((err) => console.log(err));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value
    });
  }

  function handleCheck(
    e: React.ChangeEvent<HTMLInputElement>,
    position: number
  ) {
    const tmpArr = movie.genres;
    tmpArr[position].checked = !tmpArr[position].checked;

    const tmpIDs = movie.genre_array;

    if (!e.target.checked) {
      tmpIDs.splice(tmpIDs.indexOf(Number(e.target.value)));
    } else {
      tmpIDs.push(parseInt(e.target.value, 10));
    }

    setMovie({ ...movie, genre_array: tmpIDs });

    // const isChecked = e.target.checked;

    // setMovie((prevMovie) => {
    //   const updatedGenres = prevMovie.Genres.map((genre, i) =>
    //     i === position ? { ...genre, checked: isChecked } : genre
    //   );
    //   return {
    //     ...prevMovie,
    //     Genres: updatedGenres
    //   };
    // });
  }

  const hasError = (key: string) => {
    const pos = errors.indexOf(key);
    if (pos !== -1) {
      setTimeout(() => {
        setError([]);
      }, 4000);
      return `Please enter ${key.toUpperCase()}`;
    }

    return "";
  };

  return (
    <StyledEditContainer>
      <StyledH2>Add/Edit Movie</StyledH2>
      <CenteredForm onSubmit={handleSubmit}>
        {/* <Input type="hidden" id="id" value={movie.id} name="id" /> */}
        {/* <Input
          type="hidden"
          id="genre"
          value={JSON.stringify(movie.Genres)}
          name="genres"
        /> */}
        <Input
          labelName="Title"
          type="text"
          name="title"
          value={movie.title}
          id="title"
          onChange={handleChange}
          errorMsg={hasError("title")}
        />
        <Input
          labelName="Release Date"
          type="date"
          name="release_date"
          value={movie.release_date}
          id="release_date"
          onChange={handleChange}
          errorMsg={hasError("release_date")}
        />
        <StyledFlex>
          <Input2
            labelName="Runtime"
            type="text"
            name="runtime"
            value={movie.runtime}
            id="runtime"
            onChange={handleChange}
            errorMsg={hasError("runtime")}
          />
          <Select
            label="MPAA Rating"
            placeholder="Choose..."
            name="mpaa_rating"
            value={movie.mpaa_rating}
            onChange={handleChange}
            options={mpaaOptions}
          />
        </StyledFlex>

        <TextArea
          label="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          errorMsg={hasError("description")}
        />
        <ContainerFlex2>
          <button type="submit">SAVE</button>
          {movieId > 0 && (
            <Button btn="confirm" onClick={() => confirmDelete()}>
              Delete
            </Button>
          )}
        </ContainerFlex2>
      </CenteredForm>
      {movie.genres && movie.genres.length > 0 && (
        <StyledFlexCheckBox>
          <h3>Genres</h3>
          {movie.genres.map((g, index) => (
            <Checkbox
              title={g.genre}
              name="genre"
              key={index}
              id={"genre" + index}
              onChange={(e) => handleCheck(e, index)}
              value={g.id}
              checked={g.checked}
            />
          ))}
        </StyledFlexCheckBox>
      )}
    </StyledEditContainer>
  );
}
