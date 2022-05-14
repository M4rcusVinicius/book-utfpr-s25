import styled from "styled-components";

export { Model };

const Wrapper = styled.section`
  font-family: "Exo 2", sans-serif;
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  width: 71vh;
  background-color: #fff;
  position: absolute;
`;
const Left = styled.div`
  height: 100vh;
  background-color: #ffc33b;
  width: 35.5vh;
  position: relative;
`;
const Right = styled.div`
  height: 100vh;
  width: 35.5vh;
  position: absolute;
  top: 0;
  right: 0;
`;
const Name = styled.div`
  position: absolute;
  height: 7.4vh;
  width: 71vh;
  background-color: #fff;
  top: 3vh;
  left: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4vh;
  font-weight: 600;
`;
const Icon = styled.div`
  height: 3vh;
  width: 4vh;
  background-color: white;
`;
const Title = styled.div`
  font-size: 1.5vh;
  color: #ffeccc;
  font-weight: 500;
`;
const Value = styled.div`
  font-size: 1.7vh;
  color: #ffffff;
  font-weight: 400;
`;
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 1.2vh;
`;
const PhotoContainer = styled.div`
  position: absolute;
  height: 28.4vh;
  width: 35.5vh; /*! background-color: #2cff005c; */
  top: 10.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Photo = styled.div`
  height: 23vh;
  width: 23vh;
  background-color: #0000ff80;
  border-radius: 50%;
`;
const Gender = styled.div`
  position: absolute;
  height: 10.4vh;
  width: 35.5vh;
  background-color: #fdb732;
  top: 38.8vh;
`;
const Birth = styled.div`
  position: absolute;
  height: 10.4vh;
  width: 35.5vh;
  background-color: #f3ae31;
  top: 49.3vh;
`;
const Birthplace = styled.div`
  position: absolute;
  height: 10.8vh;
  width: 35.5vh;
  background-color: #eaa630;
  top: 59.7vh;
`;
const Hobby = styled.div`
  position: absolute;
  height: 10.6vh;
  width: 35.5vh;
  background-color: #de9a2f;
  top: 70.5vh;
`;
const Links = styled.div`
  position: absolute;
  height: 18.9vh;
  width: 35.5vh;
  background-color: #d5902d;
  top: 81.1vh;
`;
const Quote = styled.div`
  text-align: center;
  position: absolute;
  height: 7.4vh;
  width: 35.5vh; /*! background-color: #2cff005c; */
  top: 10.4vh;
`;
const About = styled.div`
  position: absolute;
  height: 36.4vh;
  width: 35.5vh; /*! background-color: #0010ff5c; */
  top: 17.8vh;
`;
const Whay = styled.div`
  position: absolute;
  height: 36.4vh;
  width: 35.5vh; /*! background-color: #ff00cb5c; */
  top: 54.2vh;
`;
const Logo = styled.div`
  position: absolute;
  height: 9.2vh;
  width: 35.5vh; /*! background-color: #ff00005c; */
  top: 90.6vh;
`;
const RightContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 2vh;
  font-size: 1.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const RightIcon = styled.div`
  height: 7vh;
  width: 7vh;
  background-color: blue;
`;
const RightTitle = styled.div`
  font-size: 2.1vh;
  text-align: center;
  font-weight: 600;
  color: #cc8750;
  padding-bottom: 0.8vh;
`;
const RightValue = styled.div`
  font-weight: 400;
  text-align: justify;
`;

function Model({ user }) {
  console.log(user);
  return (
    <Wrapper>
      <Left>
        <Name>
          <span>{user.name}</span>
        </Name>
        <PhotoContainer>
          <Photo></Photo>
        </PhotoContainer>
        <Gender>
          <Container>
            <Icon></Icon>
            <Title>Gênero:</Title>
            <Value>{user.gender}</Value>
          </Container>
        </Gender>
        <Birth>
          <Container>
            <Icon></Icon>
            <Title>Data de nascimento:</Title>
            <Value>{user.birth}</Value>
          </Container>
        </Birth>
        <Birthplace>
          <Container>
            <Icon></Icon>
            <Title>Origem:</Title>
            <Value>{user.birthplace}</Value>
          </Container>
        </Birthplace>
        <Hobby>
          <Container>
            <Icon></Icon>
            <Title>Hobby:</Title>
            <Value>{user.hobby}</Value>
          </Container>
        </Hobby>
        <Links>
          <Container>
            <Icon></Icon>
            <Title>Links:</Title>
            <Value>{user.links}</Value>
          </Container>
        </Links>
      </Left>
      <Right>
        <Quote>
          <RightContainer>{user.impact}</RightContainer>
        </Quote>
        <About>
          <RightContainer>
            <RightIcon></RightIcon>
            <RightTitle>Sobre você, sonhos, ambições</RightTitle>
            <RightValue>{user.about}</RightValue>
          </RightContainer>
        </About>
        <Whay>
          <RightContainer>
            <RightIcon></RightIcon>
            <RightTitle>Por que Engenharia de Controle e Automação/ Elétrica?</RightTitle>
            <RightValue>{user.why}</RightValue>
          </RightContainer>
        </Whay>
        <Logo></Logo>
      </Right>
    </Wrapper>
  );
}
