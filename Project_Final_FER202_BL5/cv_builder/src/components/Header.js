import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css"; // Import file CSS
import { toast, ToastContainer } from "react-toastify";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const navigate = useNavigate();

  const handleTemplate = () => {
    if (!isLoggedIn) {
      toast.info("Please sign in to create CV", { autoClose: 1222 });
      return;
    } else{
      navigate("/template");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <>
      <ToastContainer />
      <Navbar collapseOnSelect expand='lg' className='fixed-header'>
        <Container>
          <Navbar.Brand href='/'>CVBuilder</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link onClick={handleTemplate}>Template</Nav.Link>
              <NavDropdown title='More' id='collapsible-nav-dropdown'>
                <NavDropdown.Item href='#blog'>Blog</NavDropdown.Item>
                <NavDropdown.Item href='#faq'>FAQ</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#something'>
                  Something else
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <div className='avatar-menu-wrapper'>
                  <img
                    src='logo192.png'
                    alt='User Avatar'
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  />
                  <div className='avatar-menu'>
                    <Nav.Link as={Link} to='/profile'>
                      Profile
                    </Nav.Link>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </div>
                </div>
              ) : (
                <>
                  <Nav.Link as={Link} to='/'>
                    Sign In
                  </Nav.Link>
                  <Nav.Link as={Link} to='/signup'>
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
