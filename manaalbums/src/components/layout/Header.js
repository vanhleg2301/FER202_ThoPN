import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./Header.css"; // Import file CSS
import AuthContext from "../../context/Context";
import { Image } from "react-bootstrap";
import Create from "../pages/photo.js/Create";

export default function Header() {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [modalCreate, setModalCreate] = useState(false);

  const handleModalCreate = async () => {
    const userId = user?.userId;
    if (!userId) {
      alert("User is not logged in");
      return;
    }
    setModalCreate(true);
  };

  const handleModalCreateClose = async () => setModalCreate(false);

  return (
    <>
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
            <Nav.Link className='m-2' onClick={handleModalCreate}>
              Create album
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link className='m-2' as={Link} to='/album'>
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
                <>
                  <Nav.Link as={Link} to='/share' style={{ marginRight: 10 }}>
                    <i class='bi bi-share-fill'></i>
                  </Nav.Link>
                  <div className='avatar-menu-wrapper'>
                    <Link className='avatar-link'>
                      <Image
                        height={40}
                        width={40}
                        roundedCircle
                        src={"/assets/images/" + user?.avatar}
                        alt='User Avatar'
                        className='avatar-img'
                      />
                    </Link>
                    <div className='avatar-menu'>
                      <Nav.Link as={Link} to='/auth/profile'>
                        Profile
                      </Nav.Link>
                      <Nav.Link as={Link} to='/auth/change-password'>
                        Change Password
                      </Nav.Link>
                      <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </div>
                  </div>
                </>
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
      <Create
        show={modalCreate}
        handleModalCreateClose={handleModalCreateClose}
      />
    </>
  );
}
