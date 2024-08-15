import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    onSearch(query); // Pass the query to the parent component
  };

  return (
    <Row className='mt-4'>
      <Col md={12}>
        <div style={{ width: "200px" }}>
          <Form>
            <Form.Control
              size='lg'
              type='text'
              placeholder='Search by title...'
              value={searchTerm}
              onChange={handleChange}
            />
          </Form>
        </div>
      </Col>
    </Row>
  );
}
