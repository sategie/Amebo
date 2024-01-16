import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="55" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link>
            <i class="fa-solid fa-house"></i>Home
            </Nav.Link>
            <Nav.Link>
            <i className="fa-solid fa-square-rss"></i>Posts
            </Nav.Link>
            <Nav.Link>
            <i class="fa-solid fa-right-to-bracket"></i>Login
            </Nav.Link>
            <Nav.Link>
            <i class="fa-solid fa-user-plus"></i>Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );    
};

export default NavBar;