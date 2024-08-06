import { SelectHTMLAttributes } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 90%;
  color: black;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: var(--color-grey-800);
  font-size: 1.5rem;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 1.3rem 1.5rem;
  border: 0.2rem solid var(--color-grey-700);
  border-radius: 0.25rem;
  background-color: white;
  color: black;
  font-size: 1rem;
  outline: none;
  border-radius: 0.6rem;
  margin-bottom: 0.4rem;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const StyledOption = styled.option`
  color: black;
`;

type Option = {
  id: string;
  value: string;
};

type SelectProps = {
  label: string;
  placeholder: string;
  options: Option[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  label,
  options,
  placeholder,
  ...props
}: SelectProps) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <StyledSelect {...props}>
        {options.map((option) => (
          <StyledOption key={option.value} value={option.value}>
            {option.value ? option.value : placeholder}
          </StyledOption>
        ))}
      </StyledSelect>
    </Wrapper>
  );
}
