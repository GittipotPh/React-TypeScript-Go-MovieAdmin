import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

type CheckboxProps = {
  id: string;
  title: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2.5rem;
  margin-bottom: 0.5rem;
  margin-top: 0.1rem;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid var(--color-grey-600);
  border-radius: 3px;
  background: ${(props) =>
    props.checked ? "var(--color-green-300)" : "transparent"};
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.8rem;
    height: 0.8rem;
    background: var(--color-grey-600);
    transform: translate(-50%, -50%)
      scale(${(props) => (props.checked ? 1 : 0)});
    transition: transform 0.2s ease;
  }
`;

const Label = styled.label`
  margin-left: 0.5rem;
  cursor: pointer;
`;

export default function Checkbox({
  id,
  title,
  checked,
  onChange,
  ...props
}: CheckboxProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <CheckboxWrapper>
      <HiddenCheckbox
        id={id}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <StyledCheckbox checked={checked} />
      <Label htmlFor={id}>{title}</Label>
    </CheckboxWrapper>
  );
}
