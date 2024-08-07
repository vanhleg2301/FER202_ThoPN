import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Image,
  Form,
} from "react-bootstrap";

export default function ProfileCreation() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    title: "Developer",
    description:
      "Passionate about technology and software development. Always eager to learn new skills and work on innovative projects.",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
    activity: [
      "Completed project X",
      "Joined a new team",
      "Attended tech conference",
    ],
    avatar: "https://via.placeholder.com/150",
  });

  const [editingField, setEditingField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setProfile({ ...profile, avatar: upload.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFieldClick = (field) => {
    setEditingField(field);
  };

  const handleFieldBlur = () => {
    setEditingField(null);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Row>
                <Col md={12} className="text-center">
                  <Form>
                    <Form.Group controlId="formName">
                      {editingField === "name" ? (
                        <Form.Control
                          type="text"
                          name="name"
                          value={profile.name}
                          onChange={handleChange}
                          onBlur={handleFieldBlur}
                          autoFocus
                        />
                      ) : (
                        <span onClick={() => handleFieldClick("name")}>
                          {profile.name}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group controlId="formTitle">
                      {editingField === "title" ? (
                        <Form.Control
                          type="text"
                          name="title"
                          value={profile.title}
                          onChange={handleChange}
                          onBlur={handleFieldBlur}
                          autoFocus
                        />
                      ) : (
                        <span onClick={() => handleFieldClick("title")}>
                          {profile.title}
                        </span>
                      )}
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={12} className="text-center">
                  <label htmlFor="avatar-upload">
                    <Image
                      src={profile.avatar}
                      roundedCircle
                      fluid
                      style={{
                        width: "150px",
                        height: "150px",
                        cursor: "pointer",
                      }}
                    />
                  </label>
                  <input
                    type="file"
                    id="avatar-upload"
                    style={{ display: "none" }}
                    onChange={handleAvatarChange}
                  />
                </Col>
                <Col md={12} className="text-center">
                  <Form>
                    <Form.Group controlId="formDescription">
                      {editingField === "description" ? (
                        <Form.Control
                          as="textarea"
                          name="description"
                          rows={3}
                          value={profile.description}
                          onChange={handleChange}
                          onBlur={handleFieldBlur}
                          autoFocus
                        />
                      ) : (
                        <span onClick={() => handleFieldClick("description")}>
                          {profile.description}
                        </span>
                      )}
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Contact Information</Card.Title>
              <Form>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email: </Form.Label>{" "}
                  {editingField === "email" ? (
                    <Form.Control
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      onBlur={handleFieldBlur}
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => handleFieldClick("email")}>
                      {profile.email}
                    </span>
                  )}
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone: </Form.Label>{" "}
                  {editingField === "phone" ? (
                    <Form.Control
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      onBlur={handleFieldBlur}
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => handleFieldClick("phone")}>
                      {profile.phone}
                    </span>
                  )}
                </Form.Group>
                <Form.Group controlId="formLocation">
                  <Form.Label>Location: </Form.Label>{" "}
                  {editingField === "location" ? (
                    <Form.Control
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      onBlur={handleFieldBlur}
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => handleFieldClick("location")}>
                      {profile.location}
                    </span>
                  )}
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Recent Activity</Card.Title>
              <ListGroup variant="flush">
                {profile.activity.map((item, index) => (
                  <ListGroup.Item key={index}>
                    {editingField === `activity-${index}` ? (
                      <Form.Control
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newActivity = [...profile.activity];
                          newActivity[index] = e.target.value;
                          setProfile({ ...profile, activity: newActivity });
                        }}
                        onBlur={handleFieldBlur}
                        autoFocus
                      />
                    ) : (
                      <span onClick={() => handleFieldClick(`activity-${index}`)}>
                        {item}
                      </span>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <ListGroup>
                <ListGroup.Item className="text-center">
                  <Button variant="primary">Save</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
