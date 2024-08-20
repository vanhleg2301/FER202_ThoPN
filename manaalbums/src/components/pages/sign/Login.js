import React, { useState } from "react";
import { Col, Row, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { decrypt } from "../../../constants/key";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Clear previous errors
    setEmailError("");
    setPasswordError("");

    try {
      // Fetch user data from API
      const { data: users } = await axios.get("http://localhost:9999/users");
      // Find the user with the matching email
      const user = users?.find(({ account }) => account?.email === email);

      if (user) {
        // Check if the password matches
        if (decrypt(user?.account?.password) === password) {
          // Store the user details in local storage
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: user?.id,
              userId: user?.userId,
              name: user?.name,
              avatar: user?.avatar,
              account: {
                email: user?.account?.email,
                // password: user?.account?.password, 
                // activeCode: user?.account?.activeCode,
                // isActive: user?.account?.isActive,
              },
              address: {
                street: user?.address?.street,
                city: user?.address?.city,
                zipCode: user?.address?.zipCode,
              },
            })
          );
          navigate("/"); // Redirect to the home page
          window.location.reload(); // Refresh the page to update the header
        } else {
          setPasswordError("Incorrect password.");
        }
      } else {
        setEmailError("Invalid email.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setEmailError("An error occurred while trying to login. Please try again.");
      setPasswordError("An error occurred while trying to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <Row className='w-100'>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className='p-4 shadow-lg'>
            <Card.Body>
              <h2 className='text-center mb-4'>Login</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group className='mb-3'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!emailError}
                    required
                  />
                  {emailError && (
                    <Form.Text className='text-danger'>{emailError}</Form.Text>
                  )}
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!passwordError}
                    required
                  />
                  {passwordError && (
                    <Form.Text className='text-danger'>{passwordError}</Form.Text>
                  )}
                </Form.Group>

                <Button
                  variant='primary'
                  type='submit'
                  className='w-100'
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
