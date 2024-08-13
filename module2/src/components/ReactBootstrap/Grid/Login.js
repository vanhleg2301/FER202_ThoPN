import React from "react";
import { Button, Col, Row, Form, Container, Alert } from "react-bootstrap";

import { Link } from "react-router-dom";
import { userData } from "../../data/data";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("Email and password fields cannot be empty.");
      return;
    }

    // Check user data
    const user = userData.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      const { email, dob, gender, address } = user;
      localStorage.setItem(
        "user",
        JSON.stringify({ email, dob, gender, address })
      );
      setErrorMessage(""); // Clear the error message
      window.location.reload(); // You might want to navigate to another page instead of reloading
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <>
      <Container id='content' className='mt-4' bg='light'>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Row className='mb-3'>
                <Col md={12}>
                  <Form.Group controlId='formGridEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter email'
                      name='email'
                      value={email}
                      onChange={handleOnChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId='formGridPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      name='password'
                      value={password}
                      onChange={handleOnChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {errorMessage && (
                <Row className='mb-3'>
                  <Col md={12}>
                    <Alert variant='danger'>{errorMessage}</Alert>
                  </Col>
                </Row>
              )}
              <Row>
                <Col>
                  <div className='text-center mb-3'>
                    Don't have an account?{" "}
                    <Link style={{ textDecoration: "none" }} to='/register'>
                      Sign Up
                    </Link>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 4, offset: 5 }}>
                  <Button variant='primary' type='submit' onClick={handleLogin}>
                    Sign In
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
