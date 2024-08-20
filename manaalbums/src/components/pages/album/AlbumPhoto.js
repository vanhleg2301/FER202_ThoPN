import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Form,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../context/Context";
import AlbumPhotoModal from "./AlbumPhotoModal";

export default function AlbumPhoto() {
  const { albumId } = useParams();
  const { user } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // To track the image within the selected photo
  const [selectImage, setSelectImage] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    if (!user) return; // Do nothing if user is not loaded yet

    axios
      .get(`http://localhost:9999/albums/${albumId}`)
      .then((response) => {})
      .catch((error) => {
        console.error("Error fetching album details:", error);
        setError("Album not found");
      });

    axios
      .get(`http://localhost:9999/photos?albumId=${albumId}`)
      .then((response) => {
        setPhotos(response?.data);
        if (response?.data.length > 0) {
          setSelectImage(response?.data[0]?.images?.url[0]); // Fixing the reference
          setCurrentPhotoIndex(0); // Set initial index if photos are available
          setCurrentImageIndex(0); // Initialize the current image index
        }
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        setError("Photos not found");
      });
  }, [albumId, user]);

  const handleImageClick = (index) => {
    setCurrentPhotoIndex(index);
    setSelectImage(photos[index]?.images?.url[0]);
    setCurrentImageIndex(0); // Reset to the first image of the selected photo
    setModalShow(true);
  };

  const handleModalClose = () => setModalShow(false);

  const handlePrevious = () => {
    const newIndex =
      (currentImageIndex - 1 + photos[currentPhotoIndex]?.images?.url?.length) %
      photos[currentPhotoIndex]?.images?.url?.length;
    setCurrentImageIndex(newIndex);
    setSelectImage(photos[currentPhotoIndex]?.images?.url[newIndex]);
  };

  const handleNext = () => {
    const newIndex =
      (currentImageIndex + 1) % photos[currentPhotoIndex]?.images?.url?.length;
    setCurrentImageIndex(newIndex);
    setSelectImage(photos[currentPhotoIndex]?.images?.url[newIndex]);
  };

  const handleEditClick = (photo) => {
    setIsEditing(true);
    setEditTitle(photo.title);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle("");
  };

  const handleTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleSaveTitle = (id) => {
    axios
      .patch(`http://localhost:9999/photos/${id}`, {
        title: editTitle,
      })
      .then((response) => {
        setPhotos((prevPhotos) =>
          prevPhotos.map((photo) =>
            photo.id === id ? { ...photo, title: editTitle } : photo
          )
        );
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating photo title:", error);
        setError("Failed to update title");
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
                    {isEditing && photo.id === photos[currentPhotoIndex]?.id ? (
                      <Form.Group controlId='formTitle'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type='text'
                          value={editTitle}
                          onChange={handleTitleChange}
                        />
                        <Button
                          variant='primary'
                          onClick={() => handleSaveTitle(photo.id)}
                          className='mr-2 mt-2'>
                          Save
                        </Button>
                        <Button
                          variant='secondary'
                          onClick={handleCancelEdit}
                          className='mt-2'>
                          Cancel
                        </Button>
                      </Form.Group>
                    ) : (
                      <>
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
                            {photo?.activity?.share}{" "}
                            <i className='bi bi-share'></i>
                          </Card.Text>
                        </div>
                        <div className='text-center'>
                          <Button
                            variant='light'
                            className='mr-2'
                            onClick={() => handleEditClick(photo)}>
                            <i className='bi bi-pencil'></i> Edit
                          </Button>
                        </div>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
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
