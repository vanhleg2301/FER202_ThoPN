import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Attempt to register the user
      const response = await axios.post("http://localhost:9999/register", {
        email,
        password,
      });
      const { regis } = response?.data;
      if (regis) {
        console.log(regis); // Log success message
        alert("Registered successfully!"); // Show success alert
        navigate("/login"); // Navigate to the login page
      }
    } catch (error) {
      // Check if the error response is available
      if (error.response) {
        // Server responded with a status other than 2xx
        alert(`Error: ${error.response.data}`);
        console.error("Register error:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        alert("No response received from the server.");
        console.error("Register error:", error.request);
      } else {
        // Something else caused the error
        alert("An error occurred during registration.");
        console.error("Register error:", error.message);
      }
    }
  };

  return (
    <Container>
      <Row className='justify-content-center mt-4'>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Register</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId='formPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant='primary' type='submit' className='mt-3'>
                  Register
                </Button>
              </Form>
              <Button
                variant='link'
                onClick={() => navigate("/login")}
                className='mt-3'>
                Already have an account? Login here.
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
