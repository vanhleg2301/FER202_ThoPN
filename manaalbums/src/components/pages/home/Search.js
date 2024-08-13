import React, { useState } from "react";
import { Form } from "react-bootstrap";

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    onSearch(query); // Pass the query to the parent component
  };

  return (
    <div style={{width: '200px'}}>
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
  );
}
