import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../context/Context";
import AlbumPhotoModal from "./AlbumPhotoModal";

export default function AlbumPhoto() {
  const { albumId } = useParams();
  const { user } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectImage, setSelectImage] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    if (!user) {
      setError("Not Found");
      return;
    }

    axios
      .get(`http://localhost:9999/albums/${albumId}`)
      .then((response) => {
        setAlbum(response?.data);
        setEditDescription(response?.data?.description || "");
      })
      .catch((error) => {
        console.error("Error fetching album details:", error);
        setError("Album not found");
      });

    axios
      .get(`http://localhost:9999/photos?albumId=${albumId}`)
      .then((response) => {
        setPhotos(response?.data);
        if (response?.data.length > 0) {
          setSelectImage(response?.data?.images?.url[0]);
          setCurrentPhotoIndex(0); // Set initial index if photos are available
        }
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
    const newIndex =
      ((currentPhotoIndex + 1) % photos?.images?.url?.length) %
      photos?.images?.url?.length;
    setSelectImage(photos?.images?.url[newIndex]);
    setCurrentPhotoIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentPhotoIndex + 1) % photos?.images?.url?.length;
    setSelectImage(photos?.images?.url[newIndex]);
    setCurrentPhotoIndex(newIndex);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditDescription(album?.description || "");
  };

  const handleDescriptionChange = (e) => {
    setEditDescription(e.target.value);
  };

  const handleSaveChanges = () => {
    axios
      .put(`http://localhost:9999/albums/${albumId}`, {
        description: editDescription,
      })
      .then(() => {
        setAlbum((prevAlbum) => ({
          ...prevAlbum,
          description: editDescription,
        }));
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating album description:", error);
        setError("Failed to update description");
      });
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
          <Row>
            {photos?.map((photo, index) => (
              <Col key={photo?.id} md={6} className='mb-4'>
                <Card>
                  <Card.Img
                    variant='top'
                    src={
                      photo?.images?.url[0].startsWith("http")
                        ? photo?.images?.url[0]
                        : "/assets/images/" + photo?.images?.url[0]
                    }
                    alt={photo?.title}
                    onClick={() => handleImageClick(index)}
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
                      <Button variant='light' className='mr-2' onClick={handleEditClick}>
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
          {isEditing && (
            <Row className='justify-content-center mt-4'>
              <Col md={8}>
                <Form>
                  <Form.Group controlId='formDescription'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type='text'
                      value={editDescription}
                      onChange={handleDescriptionChange}
                    />
                  </Form.Group>
                  <Button variant='primary' onClick={handleSaveChanges} className='mr-2'>
                    Save
                  </Button>
                  <Button variant='secondary' onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </Form>
              </Col>
            </Row>
          )}
        </Col>
      </Row>

      <AlbumPhotoModal
        show={modalShow}
        onHide={handleModalClose}
        photo={photos[currentPhotoIndex]}
        onPrevious={handlePrevious}
        onNext={handleNext}
        selectImage={selectImage}
      />
    </Container>
  );
}
