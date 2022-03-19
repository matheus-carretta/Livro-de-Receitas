import styled from 'styled-components';
import { LIGHT_BLACK, ORANGE, WHITE } from './Colors';

export const HeaderContainer = styled.header`
  align-items: center;
  background-color: ${ORANGE};
  border-bottom: solid ${LIGHT_BLACK} 0.1em;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: calc(1.56em - 0.08em);
  padding-top: 0.08em;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  color: ${WHITE};
  text-shadow: ${LIGHT_BLACK} 0.05em 0.05em 0.05em;
`;

export const Button = styled.button`
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
`;
