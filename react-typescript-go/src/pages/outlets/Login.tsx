import Input from "../../components/Input";
import styled from "styled-components";

const StyledInputDiv = styled.div`
  font-size: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
`;

const StyledH1 = styled.h1`
  text-align: center;
  font-size: 3.2rem;
  color: white;
  padding-top: 1.5rem;
`;

export default function Login() {
  return (
    <>
      <StyledInputDiv>
        <StyledH1>Please Login</StyledH1>
        <Input
          id="email"
          placeholder="enter email..."
          labelName="Email"
          type="email"
          color="black"
        />

        <Input
          id="password"
          placeholder="enter password..."
          labelName="Password"
          type="password"
          autoComplete="true"
        />
      </StyledInputDiv>
    </>
  );
}
