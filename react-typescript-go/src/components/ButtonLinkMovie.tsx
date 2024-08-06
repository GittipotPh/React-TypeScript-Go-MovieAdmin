import { AnchorHTMLAttributes, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

type StyleButtonProps = {
  $btn: "confirm" | "link" | "warning";
};

const activeLinkStyle = css`
  background-color: var(--color-yellow-700);
  color: var(--color-grey-200);
  font-weight: 700;
  font-size: 1.8rem;
  box-shadow: 0.4rem 0.5rem 0.8rem 0rem rgba(189, 173, 70, 0.63);
`;

const StyledNavLink = styled(NavLink)`
  &.active > span {
    ${activeLinkStyle}
  }
`;

const StyledButton = styled.span<StyleButtonProps>`
  color: var(--color-grey-900);
  padding: ${(props) =>
    props.$btn === "link" ? "1rem 2rem" : "1.2rem 2.5rem"};
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  font-size: 1.4rem;
  transition: all 0.3s;
  border: 1px solid #ffd8a8;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.6rem;
  /* width: 30rem; */

  &:hover {
    background-color: ${(props) =>
      props.$btn === "confirm" ? "#ef5350" : "#ffec99"};
    transform: translateX(1%);
    box-shadow: 0 0 0.3rem 0 rgba(0, 0, 0, 0.1);
    color: black;
  }
`;

type ButtonProps = {
  btn: "confirm" | "link" | "warning";
  type?: "submit" | "button" | "component" | "";
  children: ReactNode;
  to?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function ButtonLinkMovie({
  children,
  btn,

  to,
  ...props
}: ButtonProps) {
  if (btn === "link" && to) {
    return (
      <StyledNavLink
        to={to}
        {...props}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <StyledButton $btn={btn}>{children}</StyledButton>
      </StyledNavLink>
    );
  }

  return (
    <StyledButton $btn={btn} {...props}>
      {children}
    </StyledButton>
  );
}
