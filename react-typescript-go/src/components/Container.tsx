import styled from "styled-components";
import image from "../assets/image.png";

export const ExternalContainer = styled.div`
  height: 100vh;
  margin: 0 auto;
  width: 100%;
  padding-top: 1rem;
`;

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  background-color: #343a40;
  height: 91.5%;
  width: 100%;
  padding: 1rem;
`;

export const MainContainer2 = styled.div`
  /* display: grid; */

  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background-color: var(--color-grey-200);
  height: 100%;
  width: 100%;
  padding: 1rem;
  overflow-y: scroll;
`;

export const MainContainer3 = styled.div`
  /* display: grid; */
  /* grid-template-columns: 1fr; */
  grid-column: 1 / 2;
  /* grid-row: 1 / -1; */
  background-color: #343a40;
  height: 100%;
  width: 100%;
  padding: 1rem;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Background of the scrollbar track */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* Color of the scroll thumb */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Color of the scroll thumb on hover */
  }
`;

export const ContainerImg = styled.div`
  display: grid;
  background: url(${image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  z-index: -1;
  grid-template-columns: 1fr;
  align-items: center;
  /* background-image: linear-gradient(
      rgba(34, 34, 34, 0.2),
      rgba(34, 34, 34, 0.5)
    ),
    url(${image}); */
`;

export const ContainerLogin = styled.div`
  display: grid;
  height: 97%;
  padding: 1rem 1rem;
  margin: 0 1rem;
  grid-template-columns: 1fr;
  place-items: center;
  width: 55%;
  z-index: 20;
  background-color: var(--color-grey-100);
  border-radius: 1rem;

  background-color: rgba(34, 34, 34, 0.85); // 60% opacity
`;

export const ContainerButton = styled.div`
  display: grid;
  grid-template-columns: 1fr 2rem;
  column-gap: 0.5rem;
  align-items: center;
  justify-items: center;
  /* align-items: center;
  justify-content: space-between; */
  height: 100%;
  font-size: 1.8rem;

  /* width: 80%; */
  /* gap: 1.5rem; */
`;
export const ContainerButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  height: 100%;
  padding-top: 3rem;
`;

export const ContainerFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3.5rem;
`;

export const ContainerFlex2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3.5rem;
  width: 70%;
`;

export const ContainerExtractor = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
