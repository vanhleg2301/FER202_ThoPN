import React, { useContext, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../../../context/Context";
import { encrypt } from "../../../constants/key";

export default function Change() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentPassword === newPassword) {
      setMessage("New password cannot be the same as the current password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    setLoading(true);

    try {
      const usersResponse = await axios.get(`http://localhost:9999/users`);
      const users = usersResponse.data;
      const emailLocal = user?.account?.email;
      const userNewPass = users?.find(
        (user) => user?.account?.email === emailLocal
      );

      if (userNewPass) {
        await axios.put(`http://localhost:9999/users/${userNewPass?.id}`, {
          ...userNewPass,
          account: {
            ...userNewPass.account,
            password: encrypt(newPassword),
          },
        });

        alert("Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword(""); 
        setMessage("");
      } else {
        setMessage("No account found with that email.");
      }
    } catch (error) {
      setMessage("Error changing password: " + error.message);
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
              <h2 className='text-center mb-4'>Change Password</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type='password'
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  variant='primary'
                  type='submit'
                  className='w-100'
                  disabled={loading}>
                  {loading ? "Changing..." : "Change Password"}
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
