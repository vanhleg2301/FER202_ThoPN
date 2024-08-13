import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

export default function Profile() {
  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!user) {
    return <div className="text-center mt-4">No user data found. Please log in.</div>;
  }

  return (
    <div className="container mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-lg">
            <Card.Body>
              <h2 className="text-center mb-4">User Profile</h2>
              <Card.Text>
                <strong>Name:</strong> {user.name}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {user.account.email}
              </Card.Text>
              <Card.Text>
                <strong>Address:</strong>
              </Card.Text>
              <Card.Text>
                <strong>Street:</strong> {user.address.street}
              </Card.Text>
              <Card.Text>
                <strong>City:</strong> {user.address.city}
              </Card.Text>
              <Card.Text>
                <strong>Zip Code:</strong> {user.address.zipCode}
              </Card.Text>
              <div className="text-center">
                <button className="btn btn-primary">Edit Profile</button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
