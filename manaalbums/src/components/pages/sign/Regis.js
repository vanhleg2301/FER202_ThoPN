import React, { useState } from "react";
import { Col, Row, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../../../constants/key";
import { sendActivationEmail } from "./mail";

export default function Regis() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Clear previous errors
    setNameError("");
    setEmailError("");
    setPasswordError("");

    try {
      // Fetch the last user ID to determine the next ID
      const response = await axios.get("http://localhost:9999/users");
      const users = response?.data || [];

      // Check if the user already exists
      const userNameExists = users?.some((u) => u?.name === name);
      const userEmailExists = users?.some(
        ({ account }) => account?.email === email
      );

      if (userNameExists) {
        setNameError("A user with this name already exists.");
        setLoading(false);
        return;
      }

      if (userEmailExists) {
        setEmailError("A user with this email already exists.");
        setLoading(false);
        return;
      }

      const lastUser = users[users?.length - 1];
      const nextUserId = lastUser ? lastUser?.userId + 1 : 1;

      // Encrypt password
      const encryptedPassword = encrypt(password);

      // Generate activation code
      const activeCode = Math.random().toString(36).substring(2);
      const encryptedActiveCode = encrypt(activeCode);

      // Send registration data to the backend
      await axios.post("http://localhost:9999/users", {
        id: nextUserId,
        userId: nextUserId,
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

      // Send activation email
      sendActivationEmail(email, activeCode);

      toast.success("Registration successful! Check your email for the activation code.", {
        autoClose: 2000,
        position: "bottom-right",
      });

      // Redirect to another page or clear form fields
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("An error occurred during registration.", {
        autoClose: 2000,
        position: "bottom-right",
      });
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
                      isInvalid={!!nameError}
                      required
                    />
                    {nameError && (
                      <Form.Text className='text-danger'>{nameError}</Form.Text>
                    )}
                  </Form.Group>

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
