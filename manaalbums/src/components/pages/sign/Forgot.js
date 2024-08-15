import React, { useState } from 'react';
import { Col, Row, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send email to the backend to handle password reset
      await axios.post('http://localhost:3000/send-reset-link', { email });
      setMessage('If an account with that email exists, a password reset link will be sent.');
    } catch (error) {
      console.error('Error sending password reset link:', error);
      setMessage('An error occurred while trying to send the password reset link.');
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
                  {loading ? 'Sending...' : 'Send Password Reset Link'}
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
