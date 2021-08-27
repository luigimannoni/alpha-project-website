import React from 'react';
import { Link } from 'components/Router'
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Badge
} from 'react-bootstrap';

import logo from '../assets/logo.png';

export default function Navigation() {
  return (
    <Navbar
      collapseOnSelect
      sticky="top"
      expand="lg"
      bg="primary"
      variant="light"
      className="py-0"
    >
      <Container>
      <Navbar.Brand>
        <Link className="p-1" to="/">
          <img
            className="navigation--logo"
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
              Join Discord
          </Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Server status" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#">
              Kalidar 1.12 <Badge pill bg="success">Online</Badge>
            </NavDropdown.Item>
            <NavDropdown.Item href="#">
              0.5.3 PTR <Badge pill bg="warning">Locked</Badge>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

