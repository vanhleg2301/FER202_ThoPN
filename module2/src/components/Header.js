import React, { useEffect } from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  useEffect(() => {
    const u = localStorage.getItem("user");
    console.log(u);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand href='/'>
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
            {isLoggedIn ? <Nav.Link href='/ex4'>ex4</Nav.Link> : null}
            <Nav.Link href='/grid'>Grid</Nav.Link>
            <Nav.Link href='/todo'>Todo</Nav.Link>
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
              <div>
                <Button variant='outline-primary' as={Link} to='/login'>
                  Login
                </Button>
              </div>
              <div style={{ marginLeft: 2 }}>
                <Button variant='primary' as={Link} to='/register'>
                  Register
                </Button>
              </div>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
