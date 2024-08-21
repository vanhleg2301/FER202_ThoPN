import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col className="d-flex justify-content-center">
          <Button variant="primary" className="mx-2" as={Link} to="/login">
            Login
          </Button>
          <Button variant="secondary" className="mx-2" as={Link} to="/register">
            Register
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
