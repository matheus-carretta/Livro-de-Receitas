import styled from 'styled-components';
import { LIGHT_BLACK, WHITE } from './Colors';

export const ProfileContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const EmailSpan = styled.div`
  align-items: center;
  color: ${WHITE};
  display: flex;
  font-size: 1em;
  height: 60px;
  justify-content: center;
  margin-bottom: 2em;
  margin-top: 25px;
  text-shadow: ${LIGHT_BLACK} 0.05em 0.05em 0.05em;
`;
