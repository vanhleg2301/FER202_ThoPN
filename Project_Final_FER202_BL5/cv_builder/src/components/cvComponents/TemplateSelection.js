import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const templates = [
  { id: 1, name: "Template 1", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Template 2", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Template 3", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Template 4", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Template 5", image: "https://via.placeholder.com/150" },
  { id: 6, name: "Template 6", image: "https://via.placeholder.com/150" },
];

export default function TemplateSelection({ onTemplateSelect }) {
  const handleTemplateClick = (template) => {
    onTemplateSelect(template);
  };

  return (
    <Container className="mt-5">
      <Button variant="primary" as={Link} to="/">
        Back to home
      </Button>
      <Row className="justify-content-center mt-3">
        {templates.map((template) => (
          <Col key={template.id} md={4} className="mb-3">
            <Card onClick={() => handleTemplateClick(template)}>
              <Card.Img variant="top" src={template.image} />
              <Card.Body>
                <Card.Title>{template.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
