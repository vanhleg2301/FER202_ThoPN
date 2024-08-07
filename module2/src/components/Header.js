import React from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand href='#home'>
          <img
            src='logo192.png'
            width='30'
            height='30'
            className='d-inline-block align-top'
            alt='Logo'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/ex4'>ex4</Nav.Link>
            <Nav.Link href='#link'>Link</Nav.Link>
          </Nav>
          {isLoggedIn ? (
            <Nav>
              <NavDropdown title='Username' id='basic-nav-dropdown'>
                <NavDropdown.Item href='#profile'>Profile</NavDropdown.Item>
                <NavDropdown.Item href='#settings'>Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Button variant='outline-primary' onClick={handleLogin}>
                Login
              </Button>
              <Button variant='primary' href='#register' className='ms-2'>
                Register
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
