import styled from 'styled-components';
import { WHITE, LIGHT_BLACK, ORANGE } from './Colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const Text = styled.h1`
  font-size: 1.7em;
  color: ${WHITE};
  text-shadow: ${LIGHT_BLACK} 0.05em 0.05em 0.05em;
  background: ${ORANGE};
  text-align: center;
  width: 100%;
  margin-top: 1em;
  padding: 0.3em 0;
  border-top: solid ${LIGHT_BLACK} 0.1em;
  border-bottom: solid ${LIGHT_BLACK} 0.1em;
`;

export const Gif = styled.img`
  display: flex;
  justify-content: center;
`;
