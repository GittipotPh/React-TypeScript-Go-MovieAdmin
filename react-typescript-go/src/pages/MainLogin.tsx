import styled from "styled-components";
import imageBg from "../assets/bgimg.jpg";
import icon_main from "../assets/icon_main.svg";
import Input from "../components/Input";
import { FormEvent, useEffect, useState } from "react";
import { HiOutlineChevronDoubleRight } from "react-icons/hi2";
import { Form, useNavigate } from "react-router-dom";
import { AlertError, AlertSuccess } from "../components/Alert";
import Button from "../components/Button";
import {
  ContainerButton,
  ContainerButtonGroup,
  ContainerFlex,
  ContainerImg,
  ContainerLogin
} from "../components/Container";
import { useAuth } from "../contexts/AuthContext/useAuth";
import Spinner from "../components/Spinner";

const StyledInputDiv = styled.div`
  font-size: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -8rem;
  box-shadow: 0.5rem 1rem 3rem 0 rgba(0, 0, 0, 0.6);
  width: 65%;
  background-color: #adb5bd;
  padding: 2.4rem 1.6rem 6.2rem 1.6rem;
  border-radius: 1rem;
  background-image: linear-gradient(
      rgba(34, 34, 34, 0.6),
      rgba(34, 34, 34, 0.6)
    ),
    url(${imageBg});

  height: 100%;
  box-sizing: border-box;
`;

const StyledH2 = styled.h2`
  text-align: center;
  font-size: 3.2rem;
  color: white;
  padding-top: 1.5rem;
`;

const StyledH1 = styled.h1`
  text-align: center;
  color: white;

  font-size: 5.6rem;
  letter-spacing: -0.1rem;
`;

const CenteredForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: -0.8rem;
`;
const AlertWrapper = styled.div`
  width: 80%;
  margin: 1rem auto;
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { toggleRefresh, setJwtToken } = useAuth();

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  function handleSubmit(e: FormEvent) {
    setIsLoading(true);
    e.preventDefault();

    const payload = {
      email: email,
      password: password
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include" as RequestCredentials,

      body: JSON.stringify(payload)
    };

    fetch("http://localhost:8080/authenticate", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.message);
          setShowSuccess("false");
        } else {
          setMessage("Successfully authenticated");
          setShowSuccess("true");

          localStorage.setItem("jwt_token", data.access_token);
          setJwtToken(data.access_token);
          toggleRefresh(true);

          setTimeout(() => {
            navigate("/app/admin/movies/0");
          }, 2000);
        }
      })
      .catch((error) => {
        setMessage(error.message);
        setShowSuccess("false");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // const form = e.target as HTMLFormElement;
  // const formData = new FormData(form);
  // const email = formData.get("email") as string;
  // const password = formData.get("password") as string;

  return (
    <ContainerImg>
      <ContainerLogin>
        <ContainerFlex>
          <StyledH1 className="h1-cinema">Welcome to Central Cinema</StyledH1>
          <img className="icon main" src={icon_main} />
        </ContainerFlex>

        <StyledInputDiv>
          {showSuccess === "true" && (
            <AlertWrapper>
              <AlertSuccess message={message} />
            </AlertWrapper>
          )}
          {showSuccess === "false" && (
            <AlertWrapper>
              <AlertError message={message} />
            </AlertWrapper>
          )}
          {!showSuccess && <StyledH2>Login</StyledH2>}
          {!isLoading ? (
            <CenteredForm onSubmit={handleSubmit}>
              <Input
                id="email"
                placeholder="enter email..."
                labelName="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email-new"
              />

              <Input
                id="password"
                placeholder="enter password..."
                labelName="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="password-new"
              />
              <ContainerButtonGroup>
                {/* <Button className="btn-login" btn="confirm" type="submit">
                <ContainerButton>
                  <span className="btn login">Login</span>
                  <HiOutlineChevronDoubleRight />
                </ContainerButton>
              </Button> */}
                <button>
                  <ContainerButton>
                    <span className="btn login--span">Login</span>
                    <HiOutlineChevronDoubleRight />
                  </ContainerButton>
                </button>

                <Button btn="link" to="/register">
                  <ContainerButton>
                    <span className="btn register--span">Register</span>
                    <HiOutlineChevronDoubleRight />
                  </ContainerButton>
                </Button>
              </ContainerButtonGroup>
            </CenteredForm>
          ) : (
            <Spinner />
          )}
        </StyledInputDiv>
      </ContainerLogin>
    </ContainerImg>
  );
}
