import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";

export default function ShareFor({
  show,
  handleCloseShare,
  handleShareSubmit,
}) {
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

  const shareFor = async (userId) => {
    console.log(userId);
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseShare}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Modal.Title className='mb-4'>Share for someone in here</Modal.Title>
          <Row className='d-flex justify-content-center align-items-center mt-4'>
            <Col md={12}>
              {users.map((user) => (
                <Button
                  variant='outline'
                  onClick={() => shareFor(user?.userId)}>
                  <Card className='m-4'>
                    <Card.Img />
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
