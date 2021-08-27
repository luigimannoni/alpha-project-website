import React from 'react';
import { Col, Container, Button, Row } from 'react-bootstrap';

export default function Hero() {
  return (
    <section className="position-relative">
      <Container className="my-5 position-relative">
        {/* assets/videos/login-screen.mp4 */}
        <Row className="p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <Col lg={7} className="p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1">The Alpha Project</h1>
            <p className="lead">The home of everything related to pre-release versions of World of Warcraft</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <Button variant="primary" size="lg" className="px-4 me-md-2 fw-bold">Lorem</Button>
              <Button variant="outline-secondary" size="lg" className="px-4">Ipsum</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

