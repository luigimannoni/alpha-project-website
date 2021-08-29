import React, { useState, useEffect } from 'react';
import { Head } from 'react-static';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { useLocation } from '../components/Router';

export default function MarkdownPage() {
  const { pathname } = useLocation();
  const file = pathname.replace('/', '');
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('Loading');

  useEffect(() => {
    async function getMD() {
      const {attributes, react} = await import(`../content/${file}.md`);
      setMarkdown(react);
      setTitle(attributes.title);
    }
    getMD();
  }, [file]);

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
                {markdown}
              </Col>
            </Row>
          </Container>
        </article>
      </section>
    </>
  );
}
