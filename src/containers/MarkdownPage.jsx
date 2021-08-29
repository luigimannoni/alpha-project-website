import React from 'react';
import PropTypes from 'prop-types';
import { Head } from 'react-static';
import {
  Container, Row, Col,
} from 'react-bootstrap';

export default function MarkdownPage({ title, children }) {
  return (
    <>
      <Head>
        <title>{`${title} | The Alpha Project`}</title>
      </Head>
      <section>
        <article>
          <Container>
            <Row className="py-1 justify-content-center">
              <Col xs={10} md={8} lg={6}>
                {children}
              </Col>
            </Row>
          </Container>
        </article>
      </section>
    </>
  );
}

MarkdownPage.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
