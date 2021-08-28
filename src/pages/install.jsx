import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import Markdown from '../components/Markdown';

import MD_MAIN from '../content/install/main.md';

export default function InstallPage() {
  return (
    <Container>
      <Row className="py-1 justify-content-center">
        <Col xs={10} md={8} lg={6}>
          <Markdown file={MD_MAIN} />
        </Col>
      </Row>
    </Container>
  );
}
