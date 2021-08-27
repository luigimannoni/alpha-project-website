import React from 'react';

import {
  Col, Container, Button, Row,
} from 'react-bootstrap';
import { FaDiscord, FaGithub } from 'react-icons/fa';

import VideoBackground from './VideoBackground';

export default function Hero() {
  return (
    <section className="position-relative">
      <VideoBackground />
      <Container className="py-10 position-relative">
        <Row className="p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center wow__dialog">
          <Col lg={7} className="p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1">The Alpha Project</h1>
            <p className="lead">The home of everything related to pre-release versions of World of Warcraft</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <Button variant="outline-primary" className="px-5">
                <FaGithub />
                {' '}
                Download Server
              </Button>
              <Button variant="primary" className="px-5">
                <FaDiscord />
                {' '}
                Join on Discord
              </Button>
              <Button variant="outline-secondary" className="px-5">Ipsum</Button>
              <Button variant="secondary" className="px-5">Ipsum</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
