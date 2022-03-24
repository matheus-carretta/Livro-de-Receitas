import React from 'react';
import loading from '../images/loading.gif';
import { Container, Gif, Text } from '../styles/Loading';

function Loading() {
  return (
    <Container>
      <Gif src={ loading } alt="Loading Screen" />
      <Text>Temperando...</Text>
    </Container>
  );
}

export default Loading;
