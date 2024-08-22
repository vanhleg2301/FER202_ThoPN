// ShareFor.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";

export default function ShareFor({ show, handleCloseShare, handleShareSubmit }) {
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
    <>
      <Modal show={show} onHide={handleCloseShare}>
        <Modal.Header closeButton>
          <Modal.Title>Share Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='d-flex justify-content-center align-items-center mt-4'>
            <Col md={12}>
              {users.map((user) => (
                <Button
                  variant='outline'
                  key={user?.userId}
                  onClick={() => handleShareSubmit(user?.userId)}>
                  <Card className='m-4'>
                    <Card.Img src={user.avatar || "/assets/images/logo192.png"} />
                    <Card.Body>{user.name}</Card.Body>
                  </Card>
                </Button>
              ))}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
