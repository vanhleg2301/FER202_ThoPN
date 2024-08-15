import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

export default function ShareFor() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9999/users");
        setUsers(response?.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Row className='d-flex justify-content-center align-items-center mt-4'>
      <Col md={12}>
        {users.map((user) => (
          <Button
            key={user?.id}
            variant="outline-light" // Ensure this variant is defined or replace with another
            className="m-1"
            style={{
              borderRadius: "0.25rem", // Adjust styling as needed
              borderColor: "#e0e0e0",
              color: "#333",
              hover: {
                backgroundColor: "#f8f9fa",
                borderColor: "#ccc",
              },
            }}
            onClick={() => console.log(`Selected user: ${user?.name}`)} // Placeholder click action
          >
            {user?.name}
          </Button>
        ))}
      </Col>
    </Row>
  );
}
