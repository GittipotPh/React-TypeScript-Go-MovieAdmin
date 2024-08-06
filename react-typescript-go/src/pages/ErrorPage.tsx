import { ExternalContainer, MainContainer } from "../components/Container";

export default function ErrorPage() {
  return (
    <ExternalContainer>
      <MainContainer>
        <div>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
        </div>
      </MainContainer>
    </ExternalContainer>
  );
}
