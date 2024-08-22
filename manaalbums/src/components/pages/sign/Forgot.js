import React, { useState } from "react";
import { Col, Row, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { sendResetPasswordEmail } from "./mail";
import { encrypt } from "../../../constants/key";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const generateRandomPassword = (length = 7) => {
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }

      return password;
    };

    const newPassword = generateRandomPassword(); // Generate a random 7-character password

    try {
      // Fetch user data from the database
      const usersResponse = await axios.get(`http://localhost:9999/users`);
      const users = usersResponse.data;
      const user = users.find(user => user.account.email === email);

      if (user) {
        // Update the password in the database
        await axios.put(`http://localhost:9999/users/${user?.id}`, {
          ...user, 
          account: { 
            ...user.account,
            password: encrypt(newPassword),
          },
        });

        // Send reset password email
        sendResetPasswordEmail("Your Password", email, newPassword);

        setMessage(
          "If an account with that email exists, a new password has been set and sent to your email."
        );
      } else {
        setMessage("No account found with that email.");
      }
    } catch (error) {
      console.error("Error sending password reset link:", error);
      setMessage(
        "An error occurred while trying to update the password or send the email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center mt-4'>
      <Row className='w-100'>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className='p-4 shadow-lg'>
            <Card.Body>
              <h2 className='text-center mb-4'>Forgot Password</h2>
              <Form onSubmit={handleForgotPassword}>
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
                <Button
                  variant='primary'
                  type='submit'
                  className='w-100'
                  disabled={loading}>
                  {loading ? "Sending..." : "Send Password Reset Link"}
                </Button>
              </Form>
              {message && (
                <div className='mt-3 text-center'>
                  <p>{message}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
