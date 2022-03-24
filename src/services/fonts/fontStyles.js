import { createGlobalStyle } from 'styled-components';
import spillBeans from './Spill_Beans.ttf';

const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'Spill Beans';
    src: url(${spillBeans}) format('truetype');
  }
`;

export default FontStyles;
