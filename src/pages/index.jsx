import React from 'react';
import {
  Container, Row, Col, Accordion,
} from 'react-bootstrap';
import ReactPlayer from 'react-player';
import Markdown from '../components/Markdown';

import MD_MAIN from '../content/homepage/main.md';
import MD_FAQS from '../content/homepage/faqs.md';

export default function IndexPage() {
  return (
    <Container>
      <Row className="py-1">
        <Col>
          <h1>What is The Alpha Project?</h1>
        </Col>
      </Row>
      <Row className="py-1">
        <Col lg={6}>
          <Markdown file={MD_MAIN} />
        </Col>
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
      </Row>
      <Row className="py-1">
        <Col>
          <Markdown file={MD_FAQS} />
        </Col>
      </Row>
    </Container>
  );
}
