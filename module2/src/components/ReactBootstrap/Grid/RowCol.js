import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./RowCol.css";

export default function RowCol() {
  return (
    <Container id='wrapper'>
      <Row id='header'>
        <Col md={12}>Header content</Col>
      </Row>
      <Row id='content'>
        <Col className='d-none d-sm-block d-md-block'>Left</Col>
        <Col xs={12} sm={8} md={8}>
          Mid
        </Col>
        <Col className='d-none d-md-block'>Right</Col>
      </Row>
      <Row>
        <Col xs={{ order: 'last' }}>First, but last</Col>
        <Col xs>Second, but unordered</Col>
        <Col xs={{ order: 'first' }}>Third, but first</Col>
      </Row>
      <Row>
        <Col md={4}>md=4</Col>
        <Col md={{ span: 4, offset: 4 }}>{`md={{ span: 4, offset: 4 }}`}</Col>
      </Row>
      <Row>
        <Col md={{ span: 3, offset: 3 }}>{`md={{ span: 3, offset: 3 }}`}</Col>
        <Col md={{ span: 3, offset: 3 }}>{`md={{ span: 3, offset: 3 }}`}</Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>{`md={{ span: 6, offset: 3 }}`}</Col>
      </Row>
      <Row id='footer'>
        <Col md={12}>Footer</Col>
      </Row>
    </Container>
  );
}
