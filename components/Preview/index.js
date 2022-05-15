import { useState } from "react";
import styled from "styled-components";

import { Model } from './Model'

export { Preview };

const Wrapper = styled.div`
  @media (max-width: 900px) {
    display: ${(props) => (props.display ? "flex" : "none")};
    background-color: #eee;
    height: 200vh;
    width: 71vh;
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
  }
`;
const PreviewContainer = styled.section`
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  width: 71vh;
  background-color: #fff;
  position: absolute;
`;

const Button = styled.div`
  position: fixed;
  display: none;
  bottom: 0.5rem;
  right: 1rem;
  z-index: 10;
  @media (max-width: 900px) {
    display: block;
  }
`;

function Preview({ user }) {
  const [display, setDisplay] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          console.log("Click", display);
          setDisplay(!display);
        }}
      >
        <button type='submit' className='btn btn-primary mr-2'>
          Pré-visualizar
        </button>
      </Button>
      <Wrapper display={display}>
        <PreviewContainer>
          <Model user={user} />
        </PreviewContainer>
      </Wrapper>
    </>
  );
}
