import { TextareaHTMLAttributes } from "react";
import styled from "styled-components";
import { AlertErrorInput } from "./Alert";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 80%;
  color: var(--color-grey-900);
  padding-left: 0.2rem;
  position: relative;
  padding-bottom: 2rem;
`;

const StyledTextArea = styled.textarea`
  color: black;
  padding: 1rem 1rem;
  font-size: 1.5rem;
`;

const StyledLabel = styled.label``;

const StyledErrorContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 5%;
  width: 90%;
  z-index: 1;
`;

type TextAreaProps = {
  label: string;
  errorMsg: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({
  label,
  errorMsg = "",
  ...props
}: TextAreaProps) {
  return (
    <Wrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledTextArea {...props} />
      {errorMsg && (
        <StyledErrorContainer>
          <AlertErrorInput message={errorMsg} />
        </StyledErrorContainer>
      )}
    </Wrapper>
  );
}
