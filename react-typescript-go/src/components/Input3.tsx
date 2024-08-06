import { forwardRef, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { AlertErrorInput } from "./Alert";

const StyledDivInputGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 60%;
  margin: 0.5rem 0;
  padding: 1rem 2rem;
  position: relative;
`;

const StyledInput = styled.input`
  padding: 0.7rem 2rem;
  border-radius: 0.5rem;
  color: black;
`;

const StyledErrorContainer = styled.div`
  /* position: absolute;
  top: 75%;
  left: 5%;
  width: 40%;
  z-index: 1; */
  width: 40%;
`;

type StyledInputProps = {
  id: string;
  errorMsg?: string;
  labelName?: string;
};

const Input = forwardRef<
  HTMLInputElement,
  StyledInputProps & InputHTMLAttributes<HTMLInputElement>
>(({ id, labelName, errorMsg = "", ...props }, ref) => {
  return (
    <StyledDivInputGrid>
      {labelName && <label htmlFor={id}>{labelName}</label>}
      <StyledInput id={id} name={id} {...props} ref={ref} />
      {errorMsg && (
        <StyledErrorContainer>
          <AlertErrorInput message={errorMsg} />
        </StyledErrorContainer>
      )}
    </StyledDivInputGrid>
  );
});

export default Input;
