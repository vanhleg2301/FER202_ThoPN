import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Container, Card, Spinner, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const navigate = useNavigate();

  // Function to check token expiration
  const checkTokenExpiration = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    // console.log("Checking token: ", token);

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token"); // Remove the token from local storage
      setIsTokenExpired(true); // Set token expired state
    }
  };

  // Function to fetch profile data
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      checkTokenExpiration(token); // Check if the token has expired
      if (!isTokenExpired) {
        try {
          const decodedToken = jwtDecode(token);
          const response = await axios.get(
            `http://localhost:9999/profile/${decodedToken.userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setProfile(response.data);
        } catch (error) {
          setError("Failed to fetch profile. Please check your token.");
          console.error("Fetch profile error", error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/login"); // Redirect to the login page
        alert("Token expired. Please log in again."); // Show an alert
      }
    } else {
      setError("Token expired. Please log in again.");
      setLoading(false);
    }
  };

  // Periodically check token expiration
  useEffect(() => {
    fetchProfile(); // Initial fetch

    const checkInterval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token) {
        checkTokenExpiration(token);
      }
    }, 10000); // Check every 60 seconds

    return () => clearInterval(checkInterval); // Clear interval on component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, isTokenExpired]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/login"); // Redirect to the login page
  };

  if (loading) {
    return (
      <Container className='text-center'>
        <Spinner animation='border' />
        <div>Loading...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className='text-center'>
        <Alert variant='danger'>{error}</Alert>
        <Button variant='link' onClick={() => navigate("/login")}>
          Go to Login
        </Button>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container className='text-center'>
        <Alert variant='warning'>No profile data available</Alert>
      </Container>
    );
  }

  return (
    <Container className='mt-4'>
      <Card>
        <Card.Body>
          <Card.Title>Profile</Card.Title>
          <Card.Text>Email: {profile?.email}</Card.Text>
          <Button variant='link' onClick={handleLogout} className='mt-3'>
            Logout
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
