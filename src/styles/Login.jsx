import styled from 'styled-components';
import { WHITE, ORANGE, LIGHT_BLACK, DARK_ORANGE } from './Colors';
import loginBackground from '../images/loginBackground.png';

export const Container = styled.div`
  background-image: url(${loginBackground});
  height: 217px;
  width: 100%;
  position: absolute;
  top: calc((100vh - 217px) / 2);
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Input = styled.input`
  background-color: transparent;
  margin-left: 110px;
  width: 110px;
  color: ${WHITE};
  font-family: "Spill Beans";
  font-weight: 900;
  font-size: 1.5em;
  outline: none;
  ::-webkit-input-placeholder {
    color: ${WHITE}
  }
`;

export const Button = styled.button`
  margin-left: 110px;
  width: 95px;
  font-family: "Spill Beans";
  font-weight: 900;
  font-size: 0.8em;
  color: ${LIGHT_BLACK};
  background-color: ${DARK_ORANGE};
  border-radius: 5px;
  border: solid ${LIGHT_BLACK} 2px;
  :disabled {
    font-weight: 500;
    background-color: ${ORANGE};
  }
`;
