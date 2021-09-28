import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import ReactPlayer from 'react-player/youtube';
import { react as MdMain } from '../content/homepage/main.md';

export default function IndexPage() {
  return (
    <Container className="container">
      <div className="center-content">
        <Row className="py-1">
          <Col>
            <h1>What is The Alpha Project?</h1>
          </Col>
        </Row>
      </div>
      <Row className="py-1">
        <div className="center-content">
          <Col lg={6}>
            {/* Dodgykebaabs video */}
            <div className="ratio ratio-16x9">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=ZCpwYZeIBC0&t=29"
                controls
                pip
                width="100%"
                height="100%"
              />
            </div>
          </Col>
        </div>
        <div className="center-content">
          <Col lg={6} className="mt-3">
            <MdMain />
          </Col>
        </div>

      </Row>
    </Container>
  );
}
