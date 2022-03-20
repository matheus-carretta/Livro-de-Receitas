import styled from 'styled-components';
import { LIGHT_BLACK, ORANGE } from './Colors';

export const FooterContainer = styled.footer`
  align-items: center;
  background-color: ${ORANGE};
  bottom: 0;
  display: flex;
  justify-content: space-around;
  padding-top: 0.35em;
  position: fixed;
  height: calc(1.56em - 0.35em);
  width: 100%;
  border-top: solid ${LIGHT_BLACK} 0.1em;
`;

export const Icon = styled.img`
  height: 40px;
  width: 40px;
`;
