import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9999/login", {
        email,
        password,
      });
  
      const { token } = response.data;
  
      localStorage.setItem("token", token);
      navigate("/profile");
    } catch (error) {
      setError("Invalid email or password");
    }
  };
  

  return (
    <Container>
      <h2>Login</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId='formEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formPassword' className='mt-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant='primary' type='submit' className='mt-4'>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
