import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./Header.css"; // Import file CSS
import AuthContext from "../../context/Context";

export default function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      className='header-navbar'
      style={{ backgroundColor: "lightgray" }}>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          ManaAlbum
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          {/*isLoggedIn && (
            <div className="mr-2">
              <Nav.Link as={Link} to='/chat'>
                Chat
              </Nav.Link>
            </div>
          )*/}
          {isLoggedIn && (
            <Nav.Link className="m-2" as={Link} to='/album'>
              Your Album
            </Nav.Link>
          )}
          <Nav className='me-auto'>
            <NavDropdown title='More' id='collapsible-nav-dropdown'>
              <NavDropdown.Item as={Link} to='/#blog'>
                Blog
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/#faq'>
                FAQ
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to='/#something'>
                Something else
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <div className='avatar-menu-wrapper'>
                <Link className='avatar-link'>
                  <img
                    height={30}
                    width={30}
                    src='logo192.png'
                    alt='User Avatar'
                    className='avatar-img'
                  />
                </Link>
                <div className='avatar-menu'>
                  <Nav.Link as={Link} to='/auth/profile'>
                    Profile
                  </Nav.Link>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </div>
              </div>
            ) : (
              <>
                <Nav.Link as={Link} to='/auth/login'>
                  Sign In
                </Nav.Link>
                <Nav.Link as={Link} to='/auth/regis'>
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
