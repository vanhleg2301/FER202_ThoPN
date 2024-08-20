import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { ENDPOINT } from "../../../constants/Endpoint";
import { decrypt } from "../../../constants/key";
import { Spinner } from "react-bootstrap";

export default function ActiveCode() {
  const { activeCode } = useParams(); // Get the activation code from the URL
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null); // Track the message to display
  const [navigating, setNavigating] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        // Fetch the list of users
        const { data: users } = await axios.get(`${ENDPOINT}/users`);

        // Find the user with the corresponding activation code
        const foundUser = users.find((user) => {
          const decryptedCode = decrypt(user.account?.activeCode);
          console.log("Decrypted code:", decryptedCode); // Log decrypted code
          return decryptedCode === activeCode;
        });

        console.log("Found user:", foundUser); // Log found user

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
          delete updatedUser.account.activeCode;

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

    activateAccount();
  }, [activeCode, navigate]);
  
  if (navigating) {
    return (
      <div className='d-flex justify-content-center align-items-center min-vh-100'>
        <Spinner animation='border' variant='primary' />
      </div>
    );
  }
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <ToastContainer />
      {loading ? (
        <h4>Activating your account, please wait...</h4>
      ) : (
        <h4>{message}</h4> // Display the appropriate message based on the state
      )}
    </div>
  );
}
