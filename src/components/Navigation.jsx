import React from 'react';
import {
  Container,
  Nav,
  Navbar,
  Badge,
} from 'react-bootstrap';
import { FaDiscord } from 'react-icons/fa';

import { Link } from './Router';

import logo from '../assets/logo.png';

export default function Navigation() {
  return (
    <Navbar
      collapseOnSelect
      sticky="top"
      expand="lg"
      bg="dark"
      variant="dark"
      className="py-0"
    >
      <Container fluid>
        <Navbar.Brand>
          <Link className="p-1" to="/">
            <img
              className="navigation__logo"
              src={logo}
              alt="The Alpha Project"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link role="button" className="nav-link" to="/about">About</Link>
            <Nav.Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.gg/RzBMAKU"
            >
              <FaDiscord />
            </Nav.Link>
          </Nav>
          <Nav.Link>
            <span className="pe-2 text-white">Kalidar 1.12</span>
            <Badge pill bg="success">Online</Badge>
          </Nav.Link>
          <Nav.Link>
            <span className="pe-2 text-white">PTR 0.5.3</span>
            <Badge pill bg="warning">Locked</Badge>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
