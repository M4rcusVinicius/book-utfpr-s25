import { userService } from "services";
import styled from "styled-components";

import { Forms, Spinner } from "components";

export default Home;

const Wrapper = styled.section`
  display: flex;
  padding: 2rem 1rem;
  margin-right: 70vh;
  overflow: auto;
  height: 100vh;
  overflow-y: auto;

  @media (max-width: 900px) {
    margin-right: 0;
  }
`;

function Home() {
  console.log(userService.userValue);
  return (
    <Wrapper>
      <div className='container'>
        <h1>Olá {userService.userValue?.name}!</h1>
        <p>
          <span>RA: {userService.userValue?.ra} - </span>
          <span>Atualize as informações para o Book da UTFPR</span>
        </p>
        {userService.userValue ? <Forms user={userService.userValue} /> : <Spinner />}
      </div>
    </Wrapper>
  );
}
