import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
    address: "",
    gender: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:9999/user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validate form
    const { email, password, name, dob, address, gender } = formData;
    if (!email || !password || !name || !dob || !address || !gender) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    if (users.some((user) => user.email === email)) {
      setErrorMessage("User already exists.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    // Generate a new 5-digit ID
    const newId = Math.floor(10000 + Math.random() * 90000).toString();

    // Create a new user object
    const newUser = {
      id: newId,
      ...formData,
      gender: gender === "Male",
    };

    // Add the new user to userData
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setSuccessMessage("User registered successfully.");

    // Reset form
    setFormData({
      email: "",
      password: "",
      name: "",
      dob: "",
      address: "",
      gender: "",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <Row id='content' className='mt-4'>
      <Col md={{ span: 6, offset: 3 }}>
        <Form onSubmit={handleSignUp}>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter email'
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                required
              />
            </Form.Group>
          </Row>

          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridDOB'>
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type='date'
                name='dob'
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridAddress'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                name='address'
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Row} className='mt-3'>
              <Col sm={10}>
                <Form.Check
                  type='radio'
                  label='Male'
                  name='gender'
                  value='Male'
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  required
                />
                <Form.Check
                  type='radio'
                  label='Female'
                  name='gender'
                  value='Female'
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>
          </Row>

          <Form.Group className='mb-3' id='formGridCheckbox'>
            <Form.Check type='checkbox' label='Check me out' required />
          </Form.Group>
          {errorMessage && (
            <Row className='mb-3'>
              <Col md={12}>
                <Alert variant='danger'>{errorMessage}</Alert>
              </Col>
            </Row>
          )}
          {successMessage && (
            <Row className='mb-3'>
              <Col md={12}>
                <Alert variant='success'>{successMessage}</Alert>
              </Col>
            </Row>
          )}
          <Row>
            <Col md={{ span: 4, offset: 5 }}>
              <Button variant='primary' type='submit'>
                Sign Up
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
