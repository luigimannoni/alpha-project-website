/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { Head } from 'react-static';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { useLocation } from '../components/Router';
import Markdown from '../components/Markdown';

export default function MarkdownPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Head>
        <title>{`${pathname} | The Alpha Project`}</title>
      </Head>
      <section>
        <article>
          <Container>
            <Row className="py-1 justify-content-center">
              <Col xs={10} md={8} lg={6}>
                <Markdown file={pathname.replace('/', '')} />
              </Col>
            </Row>
          </Container>
        </article>
      </section>
    </>
  );
}
