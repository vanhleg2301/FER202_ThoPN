import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { ENDPOINT } from "../../../constants/Endpoint";
import { decrypt } from "../../../constants/key";
import { Spinner, Button, Form } from "react-bootstrap";

export default function ActiveCode() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [navigating, setNavigating] = useState(false);
  const [inputCode, setInputCode] = useState(""); // State to hold the user's input code
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when the user submits the code

    try {
      // Fetch the list of users
      const { data: users } = await axios.get(`${ENDPOINT}/users`);

      // Find the user with the corresponding activation code
      const foundUser = users.find((user) => {
        const decryptedCode = decrypt(user.account?.activeCode);
        return decryptedCode === inputCode;
      });

      if (foundUser) {
        // Update user status and remove the activation code property
        const updatedUser = {
          ...foundUser,
          account: {
            ...foundUser.account,
            isActive: true,
            activeCode: null, // Set activeCode to null
          },
        };

        // Remove activeCode property from the account object
        delete updatedUser?.account?.activeCode;

        await axios.put(`${ENDPOINT}/users/${foundUser.id}`, updatedUser);

        setNavigating(true);

        setMessage(
          "Your account has been activated successfully! Redirecting to login..."
        );

        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      } else {
        setMessage("Invalid activation code or account already activated.");
      }
    } catch (error) {
      setMessage(
        "An error occurred during activation. Please try again later."
      );
    } finally {
      setLoading(false); // Stop loading regardless of the outcome
    }
  };

  if (navigating) {
    return (
      <div className='d-flex justify-content-center align-items-center min-vh-100'>
        <Spinner animation='border' variant='primary' />
      </div>
    );
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-4'>
      <ToastContainer />
      <Form onSubmit={handleSubmit} className='w-50'>
        <Form.Group controlId='formActiveCode'>
          <Form.Label>Enter Activation Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter the activation code sent to your email'
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant='primary' type='submit' className='mt-3'>
          Activate Account
        </Button>
      </Form>
      {loading ? (
        <h4 className='mt-4'>Activating your account, please wait...</h4>
      ) : (
        message && <h4 className='mt-4'>{message}</h4>
      )}
    </div>
  );
}
