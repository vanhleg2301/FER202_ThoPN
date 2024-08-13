import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-3" style={{bottom: 0}}>
      <Container>
        <Row>
          <Col className="text-center mt-3">
            <p>&copy; {new Date().getFullYear()} FER202. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
