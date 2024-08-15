import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function Profile() {
  // Retrieve user data from local storage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  useEffect(() => {
    // Sync formData with user state when user updates
    setFormData({ ...user });
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [key, subKey] = name.split(".");

    if (subKey) {
      // Update nested object properties
      setFormData((prevData) => ({
        ...prevData,
        [key]: {
          ...prevData[key],
          [subKey]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      // Ensure zipCode is a number
      const updatedData = {
        ...formData,
        address: {
          ...formData?.address,
          zipCode: Number(formData?.address?.zipCode),
        },
      };
  
      // Send updated user data to the backend
      await axios.put(`http://localhost:9999/users/${user?.userId}`, updatedData);
      
      // Store the user details in local storage
      localStorage.setItem("user", JSON.stringify(updatedData));
  
      // Update user state
      setUser(updatedData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };
  

  if (!user) {
    return (
      <div className='justify-content-center align-items-center min-vh-100'>
        No user data found. Please log in.
      </div>
    );
  }

  return (
    <div className='justify-content-center align-items-center min-vh-100'>
      <Row className='justify-content-center'>
        <Col md={8} lg={6}>
          <Card className='shadow-lg border-0 rounded'>
            <Card.Body>
              <h2 className='text-center mb-4'>User Profile</h2>
              {isEditing ? (
                <Form>
                  <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='text'
                      name='name'
                      value={formData?.name}
                      onChange={handleChange}
                      required
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      name='email'
                      value={formData?.account?.email}
                      onChange={handleChange}
                      required
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      type='text'
                      name='address.street'
                      value={formData?.address?.street || ""}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type='text'
                      name='address.city'
                      value={formData?.address?.city || ""}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type='number'
                      name='address.zipCode'
                      value={formData?.address?.zipCode || ""}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <div className='text-center'>
                    <Button variant='primary' onClick={handleSave}>
                      Save
                    </Button>
                    <Button
                      variant='secondary'
                      onClick={handleEditToggle}
                      className='ms-2'>
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <Row className='mb-3'>
                    <Col xs={12} sm={4}>
                      <strong>Name:</strong>
                    </Col>
                    <Col xs={12} sm={8}>
                      <Card.Text>{user?.name}</Card.Text>
                    </Col>
                  </Row>
                  <Row className='mb-3'>
                    <Col xs={12} sm={4}>
                      <strong>Email:</strong>
                    </Col>
                    <Col xs={12} sm={8}>
                      <Card.Text>{user?.account?.email}</Card.Text>
                    </Col>
                  </Row>
                  <Row className='mb-3'>
                    <Col xs={12} sm={4}>
                      <strong>Address:</strong>
                    </Col>
                    <Col xs={12} sm={8}>
                      <Card.Text>
                        <strong>Street:</strong> {user?.address?.street}
                      </Card.Text>
                      <Card.Text>
                        <strong>City:</strong> {user?.address?.city}
                      </Card.Text>
                      <Card.Text>
                        <strong>Zip Code:</strong> {user?.address?.zipCode}
                      </Card.Text>
                    </Col>
                  </Row>
                  <div className='text-center'>
                    <Button
                      variant='primary'
                      size='lg'
                      onClick={handleEditToggle}>
                      Edit Profile
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
