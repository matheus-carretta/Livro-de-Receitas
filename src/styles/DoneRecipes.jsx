import styled from 'styled-components';
import { ORANGE, LIGHT_BLACK, LIGHT_GRAY, WHITE } from './Colors';

export const CenterContainer = styled.div`
  margin: 0 auto;
  width: 90%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 0.5em;
`;

export const FilterButton = styled.button`
  background-color: ${ORANGE};
  border: 2px solid ${LIGHT_BLACK};
  border-radius: 3px;
  font-weight: 900;
  font-family: 'Spill Beans';
  font-size: 1em;
  margin: 10px 0;
  padding: 0px 0.5em;
`;

export const RecipeCard = styled.div`
  border-radius: 3px;
  background-color: ${ORANGE} ;
  box-shadow: 2px 3px 3px black;
  display: flex;
  flex-direction: row;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  max-height: 150px;
`;

export const RecipeImgContainer = styled.div`
  display: flex;
  width: 50%;
  & > img {
    border-radius: 3px 0 0 3px;
  }
`;

export const Main = styled.main`
  max-height: 640px;
  overflow-y: scroll;
`;

export const CardInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 3px;
  overflow: hidden;
  width: 50%;
  &  > h2 {
  color: ${WHITE};
  font-size: 0.8em;
  font-weight: 600;
  margin: 0 auto;
  text-align: center;
  text-decoration: none;
  text-shadow: ${LIGHT_BLACK} 0.05em 0.05em 0.05em;
  }
  & > h2 ~ h3 {
    color: ${LIGHT_BLACK};
    font-size: 0.6em;
    text-align: center;
  }
`;

export const CardTopInfos = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: small;
  justify-content: space-between;
  margin-top: 0.2em;
  & > button {
    background-color: transparent;
    border: none;
  }
  & > h3 {
  color: ${LIGHT_GRAY};
  font-size: 1.1em;
  font-weight: 900;
  text-shadow: ${LIGHT_BLACK} 0.05em 0.05em 0.05em;
  text-align: center;
  }
`;
