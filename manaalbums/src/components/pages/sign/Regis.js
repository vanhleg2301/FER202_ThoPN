import React, { useState } from "react";
import { Col, Row, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { encryptPassword } from "../../../constants/key";

export default function Regis() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fetch the last user ID to determine the next ID
      const response = await axios.get("http://localhost:9999/users");
      const users = response?.data || [];

      // Check if the user already exists
      const userNameExists = users?.some(
        (u) => u?.name === name
      );

      const userEmailExists = users?.some(
        ({ account }) => account?.email === email
      );

      if (userNameExists) {
        toast.error("A user with this name already exists.", {
          autoClose: 1000, // Closes the toast after 5 seconds
          position: "bottom-right", // Position the toast at the top-right corner
        });
        setLoading(false);
        return;
      }

      if (userEmailExists) {
        toast.error("A user with this email already exists.", {
          autoClose: 1000, // Closes the toast after 5 seconds
          position: "bottom-right", // Position the toast at the top-right corner
        });
        setLoading(false);
        return;
      }

      const lastUser = users[users?.length - 1];
      const nextUserId = lastUser ? lastUser?.userId + 1 : 1;
      const newId = nextUserId;

      // Generate a unique activation code
      const encryptedPassword = encryptPassword(password);
      const activeCode = Math.random().toString(36).substring(2);
      const encryptedActiveCode = encryptPassword(activeCode);

      // Send registration data to the backend
      await axios.post("http://localhost:9999/users", {
        id: newId, // Use newId as the unique identifier
        userId: nextUserId, // Incremented userId
        name,
        account: {
          email,
          password: encryptedPassword,
          activeCode: encryptedActiveCode,
          isActive: false,
        },
        address: {
          street: "",
          city: "",
          zipCode: "",
        },
      });

      alert(
        "Registration successful! Please check your email to activate your account."
      );
      navigate("/auth/login");
      // Redirect or clear form
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='d-flex justify-content-center align-items-center min-vh-100'>
        <Row className='w-100'>
          <Col md={{ span: 6, offset: 3 }}>
            <Card className='p-4 shadow-lg'>
              <Card.Body>
                <h2 className='text-center mb-4'>Register</h2>
                <Form onSubmit={handleRegister}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter your name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter your email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Enter your password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    variant='primary'
                    type='submit'
                    className='w-100'
                    disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
