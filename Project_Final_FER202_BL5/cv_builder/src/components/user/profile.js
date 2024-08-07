import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Row>
                <Col md={4} className="text-center">
                  <Image
                    src="https://via.placeholder.com/150" // Replace with user profile image
                    roundedCircle
                    fluid
                    style={{ width: '150px', height: '150px' }}
                  />
                </Col>
                <Col md={8}>
                  <Card.Title>John Doe</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Software Engineer</Card.Subtitle>
                  <Card.Text>
                    Passionate about technology and software development. Always eager to learn new skills and work on innovative projects.
                  </Card.Text>
                  <Button variant="primary" as={Link}to='/' >Back to home</Button>
                  <Button variant="primary" className='m-2'>Edit Profile</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Contact Information</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Email: john.doe@example.com</ListGroup.Item>
                <ListGroup.Item>Phone: (123) 456-7890</ListGroup.Item>
                <ListGroup.Item>Location: San Francisco, CA</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Recent Activity</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Completed project X</ListGroup.Item>
                <ListGroup.Item>Joined a new team</ListGroup.Item>
                <ListGroup.Item>Attended tech conference</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
