import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/Context";
import axios from "axios";
import { Col, Container, Row, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Album() {
  const { user } = useContext(AuthContext);
  const [albums, setAlbums] = useState([]);

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

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:9999/albums/${id}`);
  //     setAlbums(albums.filter((album) => album.id !== id));
  //   } catch (error) {
  //     console.error("Error deleting album:", error);
  //   }
  // };

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
                        {/* Add more album details here if needed */}
                      </Card.Text>
                      <div className='d-flex justify-content-end'>
                        <Button variant='outline' className='mr-2'>
                          <i className='bi bi-pencil'></i> {/* Edit Icon */}
                        </Button>
                        <Button variant='outline'>
                          <i className='bi bi-trash'></i> {/* Delete Icon */}
                        </Button>
                      </div>
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
    </Container>
  );
}
