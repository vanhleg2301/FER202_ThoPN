import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../context/Context";

export default function AlbumPhoto() {
  const { albumId } = useParams();
  const { user } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      // Redirect to login or show a message if the user is not logged in
      setError("Not Found");
      return;
    }

    // Fetch album details
    axios
      .get(`http://localhost:9999/albums/${albumId}`)
      .then((response) => {
        setAlbum(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching album details:", error);
        setError("Album not found");
      });

    // Fetch photos for the album
    axios
      .get(`http://localhost:9999/photos?albumId=${albumId}`)
      .then((response) => {
        setPhotos(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        setError("Photos not found");
      });
  }, [albumId, user]);

  const handleImageClick = (index) => {
    setCurrentPhotoIndex(index);
    setModalShow(true);
  };

  const handleModalClose = () => setModalShow(false);

  const handlePrevious = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + photos?.length) % photos?.length
    );
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos?.length);
  };

  if (error) {
    return (
      <Container>
        <Row className='justify-content-center'>
          <Col md={8}>
            <Alert variant='danger' className='text-center mt-4'>
              {error}
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={8}>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <h2>{album?.description || "Photos"}</h2>
          </div>
          <Row>
            {photos?.map((photo, index) => (
              <Col key={photo?.id} md={6} className='mb-4'>
                <Card>
                  <Card.Img
                    variant='top'
                    src={photo?.images?.url[0]} // Show the first image
                    alt={photo?.title}
                    onClick={() => handleImageClick(index)} // Handle image click
                    style={{ cursor: "pointer" }}
                  />
                  <Card.Body>
                    <Card.Title>{photo?.title}</Card.Title>
                    <div className='d-flex justify-content-between align-items-center mt-2 mb-2'>
                      <Card.Text className='mb-0'>
                        {photo?.activity?.like}{" "}
                        <i className='bi bi-heart-fill'></i>
                      </Card.Text>
                      <Card.Text className='mb-0'>
                        {photo?.activity?.comments}{" "}
                        <i className='bi bi-chat-dots'></i>
                      </Card.Text>
                      <Card.Text className='mb-0'>
                        {photo?.activity?.share} <i className='bi bi-share'></i>
                      </Card.Text>
                    </div>
                    <div className='text-center'>
                      <Button variant='light' className='mr-2'>
                        <i className='bi bi-pencil'></i> Edit
                      </Button>
                      <Button variant='light'>
                        <i className='bi bi-trash'></i> Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Modal for displaying all images */}
      <Modal show={modalShow} onHide={handleModalClose} size='lg' centered>
        <Modal.Body>
          <div className='d-flex justify-content-center align-items-center'>
            <Button variant='light' onClick={handlePrevious}>
              &lt;
            </Button>
            <img
              src={photos[currentPhotoIndex]?.images?.url[0]}
              alt={photos[currentPhotoIndex]?.title}
              style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
            />
            <Button variant='light' onClick={handleNext}>
              &gt;
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
