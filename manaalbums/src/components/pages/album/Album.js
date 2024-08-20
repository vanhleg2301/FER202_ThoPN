import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/Context";
import axios from "axios";
import {
  Col,
  Container,
  Row,
  Card,
  Alert,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Album() {
  const { user } = useContext(AuthContext);
  const [albums, setAlbums] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get("http://localhost:9999/albums");
        setAlbums(response?.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, []);

  // Filter albums based on user ID
  const albumOfUser = albums?.filter((album) => album?.userId === user?.userId);
  
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this album?"
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:9999/albums/${id}`);
        setAlbums(albums.filter((album) => album.id !== id));
      } catch (error) {
        console.error("Error deleting album:", error);
      }
    }
  };

  const editTitleAlbum = (album) => {
    setCurrentAlbum(album);
    setNewTitle(album?.description);
    setShowEditModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:9999/albums/${currentAlbum?.id}`, {
        ...currentAlbum,
        description: newTitle,
      });
      setAlbums(
        albums.map((album) =>
          album.id === currentAlbum.id
            ? { ...album, description: newTitle }
            : album
        )
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating album:", error);
    }
  };

  return (
    <Container className='min-vh-100'>
      <Row className='justify-content-center'>
        <Col md={8}>
          <h2 className='text-center mb-4'>Albums</h2>
          {albumOfUser?.length > 0 ? (
            <Row>
              {albumOfUser?.map((album) => (
                <Col md={4} key={album?.id} className='mb-4'>
                  <Card>
                    <Card.Body>
                      <Card.Title
                        as={Link}
                        style={{ textDecoration: "none" }}
                        to={`${album?.id}`}>
                        <h4>{album?.description}</h4>
                      </Card.Title>
                      <Card.Text>
                        <div className='text-center'>
                          <Button
                            variant='light'
                            className='mr-2'
                            onClick={() => editTitleAlbum(album)}>
                            <i className='bi bi-pencil'></i> Edit
                          </Button>
                          <Button
                            variant='light'
                            onClick={() => handleDelete(album?.id)}>
                            <i className='bi bi-trash'></i> Delete
                          </Button>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant='danger' className='text-center mt-4'>
              <p className='text-center'>No albums found.</p>
            </Alert>
          )}
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Album Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>New Title</Form.Label>
              <Form.Control
                type='text'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
