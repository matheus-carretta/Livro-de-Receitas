import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LIGHT_BLACK, ORANGE, PINK, WHITE } from './Colors';

export const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const ExploreBtn = styled.button`
  width: 60%;
  padding: 0.8em;
  font-size: 1.2em;
  border-radius: 5px;
  border: solid ${LIGHT_BLACK} 0.1em;
  background-color: ${ORANGE};
  font-family: 'Spill Beans';
  margin: 0 auto;
`;

export const ButtonLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
`;

export const RecipeCard = styled.div`
  border-radius: 6px;
  box-shadow: 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  color: ${WHITE};
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.3em 0.2em;
  margin: 0.25em;
  background-color: ${PINK};
  width: 42%;
  text-align: center;
  text-shadow: ${LIGHT_BLACK} 0.05em 0.05em 0.05em;
`;

export const Imagem = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  border-radius: 50%;
`;

export const FlexWrapContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Dropdown = styled.select`
  font-size: 2.5rem;
  background-color: #fdfbfb;
  font-weight: 700;
  outline: 0;
  font-family: 'Spill Beans';
  padding: 3px;
  width: 96%;
  margin-top: 0.2em;
  margin-left: 0.2em;
  border-radius: 20px;
`;
