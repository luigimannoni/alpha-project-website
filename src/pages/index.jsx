import React from 'react';
import {
  Container, Row, Col, Accordion,
} from 'react-bootstrap';
import ReactPlayer from 'react-player';

export default function IndexPage() {
  const faqs = [
    {
      q: 'Are there any online servers?',
      a: 'Yes, we have a 0.5.3 server and a 1.12 one.',
    },
    {
      q: 'How can I play the 0.5.3 server?',
      a: 'At this moment only Contributors (people who contribute in any way to the development of the emulator) and Supporters (people who donate to the project or provide any needed things like infrastructure or advertisement) can play it. However, the emulator is completely available for you to download and set up your own server.',
    },
    {
      q: 'How can I play the 1.12 server?',
      a: 'Send a PM to @Alpha Project [Kalidar 1.12] with the following text: !register. The realmlist is logon1.thealphaproject.eu. Please, use the channels under the KALIDAR section for discussions about this server.',
    },
  ];

  return (
    <Container>
      <Row className="py-3">
        <Col>
          <h1>What is The Alpha Project?</h1>
          <p>
            Welcome to the Alpha Project Discord server!
            Here you will find updates and talks about this project, a completely new emulator for the earliest version available, the 0.5.3 Friends and Family alpha.
            You can talk here about anything related to this game and project, or just meet wonderful people of our community.
            We also have an off-topic channel if you just feel chatty. :blush:
          </p>

          <p>Here is a list of useful links:</p>

          <p>· Main project page: https://github.com/The-Alpha-Project</p>
          <p>· Old client ISOs: https://archive.org/download/World_of_Warcraft_Client_and_Installation_Archive/ISO/</p>
          <p>· Modded executable (removes debug stuff, adds 16:9 support and normal login screen, etc): http://www.mediafire.com/file/wjbk1ovyyb6ry7l/Mods.zip/file</p>
          <p>· Permanent url to this Discord: https://discord.gg/RzBMAKU</p>
          <p>· Do you feel generous and want to support my work? :green_heart: Share a coffee with me on ko-fi: https://ko-fi.com/grender and get your @Supporter role!</p>
        </Col>
        <Col>
          {/* Dodgykebaabs video */}
          <ReactPlayer
            url="https://www.youtube.com/watch?v=ZCpwYZeIBC0&t=29"
            controls
            pip
          />
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          <Accordion defaultActiveKey="0" flush>
            {faqs.map((faq, index) => (
              <Accordion.Item key={index} eventKey={index}>
                <Accordion.Header>{faq.q}</Accordion.Header>
                <Accordion.Body>{faq.a}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>

  );
}
