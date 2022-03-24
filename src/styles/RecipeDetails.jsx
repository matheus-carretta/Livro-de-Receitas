import styled from 'styled-components';
import { HeaderContainer } from './Header';
import { LIGHT_BLACK, WHITE, PINK, ORANGE } from './Colors';

export const ImageContainer = styled.div`
  height: 155px;
  width: 100%;
`;

export const ImgHeader = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

export const Body = styled.div`
  padding: 2.5%;
`;

export const TitleContainer = styled(HeaderContainer)`
  box-sizing: content-box;
  position: relative;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 2em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  width: 100%;
  border-top: solid ${LIGHT_BLACK} 0.1em;
`;

export const TitleContainerSt = styled.div`
  align-items: center;
  display: flex;
  height: 2em;
  width: 100%;
`;

export const HeaderTitle = styled.h2`
  padding-left: 4px;
  flex-grow: 1;
  max-width: calc(100vw - 79px);
`;

export const HeaderSubTitle = styled.h5`
  padding-left: 8px;
  color: ${WHITE};
  text-shadow: ${LIGHT_BLACK} 0.05em 0.05em 0.05em;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0;
  padding-top: 1em;
`;

export const TextContainer = styled.ul`
  align-items: flex-start;
  background-color: ${PINK};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-top: 0.2em;
  min-width: calc(342px - (2 * 0.7em));
  padding: 0.7em;
  color: ${WHITE};
`;

export const Item = styled.li`
  font-size: 0.9em;
  list-style-type: '- ';
  margin: 0;
  font-weight: 500;
  margin-left: 0.5em;
  text-align: center;
`;

export const ItemInProgress = styled.label`
  align-items: center;
  display: flex;
  line-height: 1.9em;
  list-style-type: none;
  & > input {
    transform: scale(1.8);
  };
`;

export const Instruction = styled.p`
  align-items: flex-start;
  background-color: ${PINK};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-top: 0.2em;
  min-width: calc(342px - (2 * 0.7em));
  padding: 0.7em;
  font-weight: 500;
  font-size: 0.9em;
  text-align: justify;
  color: ${WHITE};
  margin-bottom: ${({ margin = 0 }) => margin};
`;

export const Video = styled.embed`
  align-items: flex-start;
  background-color: ${PINK};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-top: 0.2em;
  min-width: calc(342px - (2 * 0.3em));
  padding: 0.3em;
`;

export const Carousel = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  padding-bottom: 1em;
  width: 100%;
`;

export const RecommendationCard = styled.div`
  border-radius: 6px;
  box-shadow: 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  margin-right: 0.2em;
  margin-bottom: 1.5em;
  object-fit: cover;
  padding-bottom: 0.1em;
  background-color: ${PINK};
`;

export const RecommendationImg = styled.img`
  border-radius: 6px 6px 0 0;
  width: 5.2em;
`;

export const RecommendationCategory = styled(HeaderSubTitle)`
  font-size: 0.6em;
  padding: 0.2em;
  padding-left: 0.4em;
`;

export const RecommendationName = styled.span`
  font-size: 0.9em;
  padding: 0.2em;
`;

export const StartButton = styled.button`
  background-color: ${ORANGE};
  border: none;
  bottom: 0;
  font-size: 1.2em;
  font-family: "Spill Beans";
  font-weight: 900;
  color: ${WHITE};
  text-shadow: ${LIGHT_BLACK} 0.05em 0.05em 0.05em;
  height: 1.9em;
  margin-top: 1em;
  position: fixed;
  width: 100%;
  border-top: solid ${LIGHT_BLACK} 0.1em;
`;

export const Copied = styled.p`
  background-color: ${ORANGE};
  border-radius: 5px;
  bottom: 2.5em;
  height: 1em;
  left: calc(50vw - 4em);
  padding: 0.3em 1em;
  position: fixed;
  text-align: center;
  width: 6em;
  color: ${WHITE};
  text-shadow: ${LIGHT_BLACK} 0.05em 0.05em 0.05em;
  border: solid ${LIGHT_BLACK} 0.07em;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  background-color: red;
`;
