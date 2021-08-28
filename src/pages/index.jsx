import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactPlayer from 'react-player';

export default function IndexPage() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>What is The Alpha Project?</h1>
          {/* Dodgykebaabs video */}
          <ReactPlayer
            url="https://www.youtube.com/watch?v=ZCpwYZeIBC0&t=29"
            controls
            pip
          />
        </Col>
        <Col />
      </Row>
    </Container>

  );
}
