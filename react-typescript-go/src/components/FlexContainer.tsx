import { ReactNode } from "react";
import styled from "styled-components";

type StyledFlexContainerpropsDiv = {
  $gap: number;
  $marginright: number;
};

const StyledFlexContainer = styled.div<StyledFlexContainerpropsDiv>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.$gap}rem;
  height: 100%;
  margin-right: ${(props) => props.$marginright}rem;
  margin-left: 1rem;
`;

type StyledFlexContainerprops = {
  children: ReactNode;
  gap: number;
  marginright: number;
};
export function FlexContainer({
  children,
  gap,
  marginright
}: StyledFlexContainerprops) {
  return (
    <StyledFlexContainer $gap={gap} $marginright={marginright}>
      {children}
    </StyledFlexContainer>
  );
}
