import { useState } from "react";
import styled from "styled-components";

export { Preview };

/* 

297 --- h
210 --- 100vw

*/

const Wrapper = styled.div`
  @media (max-width: 900px) {
    display: ${(props) => (props.display ? "flex" : "none")};
    background-color: #eee;
    height: 100vh;
    width: 100vw;
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
  width: 70vh;
  background-color: white;

  @media (max-width: 900px) {
    width: 100vw;
    height: 141vw;
    position: relative;
  }
`;
const LeftBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 35vh;
  background-color: #ffc33b;

  @media (max-width: 900px) {
    height: 100vw;
    width: 50vw;
  }
`;
const Name = styled.div`
  position: absolute;
  left: 0;
  top: 5vh;
  height: 8vh;
  width: 70vh;
  background-color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 4vh;

  @media (max-width: 900px) {
    font-size: 5vw;
    top: 8vw;
    height: 12vw;
    width: 100vw;
  }
`;
const PhotoBox = styled.div`
  position: absolute;
  left: 0;
  top: 13vh;
  height: 27vh;
  width: 35vh;
  background-color: #ffc33b;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    top: 20vw;
    height: 38vw;
    width: 50vw;
  }
`;
const Photo = styled.div`
  height: 20vh;
  width: 20vh;
  border-radius: 50%;
  background-color: white;
  border: 1px solid black;
  @media (max-width: 900px) {
    height: 30vw;
    width: 30vw;
  }
`;
const Block = styled.div`
  position: absolute;
  left: 0;
  top: ${(props) => 40 + props.num * 15}vh;
  height: 15vh;
  width: 35vh;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 900px) {
    top: ${(props) => 58 + props.num * 20.7}vw;
    height: 21vw;
    width: 50vw;
  }
`;
const BlockTitle = styled.div`
  color: white;
  font-size: 2vh;
  @media (max-width: 900px) {
    font-size: 3.2vw;
  }
`;
const BlockValue = styled.div`
  color: white;
  font-weight: 600;
  font-size: 2.5vh;
  @media (max-width: 900px) {
    font-size: 3.8vw;
  }
`;
const Description = styled.div`
  position: absolute;
  right: 0;
  top: ${(props) => props.top ? '22' : '62'}vh;
  height: 38vh;
  width: 35vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 2vh 3vh;
  @media (max-width: 900px) {
    padding: 3vw 3.2vw;
    height: 48vw;
  top: ${(props) => props.top ? '35' : '92'}vw;
    width: 50vw;
  }
`;
const DescTitle = styled.div`
  color: #cc8751;
  font-size: 2vh;
  text-align: center;
  font-weight: 700;
  padding-bottom: 0.5vh;
  @media (max-width: 900px) {
    padding-bottom: 1vw;
    font-size: 2.8vw;
  }
`;
const DescValue = styled.div`
  color: black;
  font-size: 1.8vh;
  text-align: justify;
  @media (max-width: 900px) {
    font-size: 2.5vw;
  }
`;
const Button = styled.div`
  position: absolute;
  display: none;
  top: 0.5rem;
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
          console.log('Click', display)
          setDisplay(!display);
        }}
      >
        <button type='submit' className='btn btn-primary mr-2'>
          Pré-visualizar
        </button>
      </Button>
      <Wrapper display={display}>
        <PreviewContainer>
          <LeftBlock />
          <Name>{user.name}</Name>
          <PhotoBox>
            <Photo />
          </PhotoBox>
          <Block num={0} color='#fdb732'>
            <BlockTitle>Gênero</BlockTitle>
            <BlockValue>{user.gender}</BlockValue>
          </Block>
          <Block num={1} color='#f3ae31'>
            <BlockTitle>Data de nascimento</BlockTitle>
            <BlockValue>{user.birth}</BlockValue>
          </Block>
          <Block num={2} color='#eaa630'>
            <BlockTitle>Origem</BlockTitle>
            <BlockValue>{user.birthplace}</BlockValue>
          </Block>
          <Block num={3} color='#de9a2f'>
            <BlockTitle>Hobby</BlockTitle>
            <BlockValue>{user.hobby}</BlockValue>
          </Block>
          <Description top>
            <DescTitle>Sobre você, sonhos, ambições</DescTitle>
            <DescValue>{user.about}</DescValue>
          </Description>
          <Description>
            <DescTitle>Porque você escolheu engenharia</DescTitle>
            <DescValue>{user.why}</DescValue>
          </Description>
        </PreviewContainer>
      </Wrapper>
    </>
  );
}
