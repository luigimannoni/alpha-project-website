import React from 'react';

import {
  Col, Container, Button, Row,
} from 'react-bootstrap';
import { FaGithub, FaCloudDownloadAlt } from 'react-icons/fa';
import { IoMdRocket } from 'react-icons/io';
import { Location } from './Router';

import Logo from './Logo';
import VideoBackground from './VideoBackground';

function HeroComponent() {
  return (
    <section className="position-relative">
      <VideoBackground />
      <Container className="py-10 position-relative">
        <Row className="p-4 align-items-center wow__dialog pt-7 text-center">
          <Col>
            <Row className="justify-content-center">
              <Col className="position-absolute top-0 start-50 translate-middle" xs={5} sm={5} md={3} lg={2}>
                <div className="p-4 rounded-circle">
                  <Logo />
                </div>
              </Col>
            </Row>
            <h1 className="fw-bold text-uppercase">The Alpha Project</h1>
            <p className="lead">The home of everything related to pre-release versions of World of Warcraft</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center mb-4 mb-lg-3">
              <Button
                target="_blank"
                href="https://github.com/The-Alpha-Project/alpha-core"
                variant="outline-primary"
                className="px-5"
              >
                <FaGithub className="me-2" />
                Clone Server
              </Button>

              <Button
                target="_blank"
                href="https://github.com/The-Alpha-Project/Alpha-Launcher/releases"
                variant="outline-secondary"
                className="px-5"
              >
                <IoMdRocket className="me-2" />
                Alpha Launcher
              </Button>

              <Button
                target="_blank"
                rel="noopener noreferrer"
                href="https://archive.org/download/World_of_Warcraft_Client_and_Installation_Archive/ISO/"
                variant="outline-secondary"
                className="px-5"
              >
                <FaCloudDownloadAlt className="me-2" />
                0.5.3 Client
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default function Hero() {
  return (
    <Location>
      {({ location }) => {
        if (location.pathname === '/') {
          return <HeroComponent />;
        }
        return null;
      }}
    </Location>
  );
}
