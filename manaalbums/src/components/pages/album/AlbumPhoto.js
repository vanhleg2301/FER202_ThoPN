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
import PhotoUploadModal from "./PhotoUploadModal";

export default function AlbumPhoto() {
  const { albumId } = useParams();
  const { user } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [uploadModalShow, setUploadModalShow] = useState(false); // State for upload modal
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // To track the image within the selected photo
  const [selectImage, setSelectImage] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [files, setFiles] = useState([]);

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
  const handleUploadModalClose = () => setUploadModalShow(false);

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

  const handleSaveTitle = async (id) => {
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

  const handleCreatePhoto = async (selectedFiles) => {
    if (!user) {
      alert("You must be logged in to create an album.");
      return;
    }

    if (!title.trim()) {
      alert("Description cannot be empty.");
      return;
    }

    if (selectedFiles.length === 0) {
      alert("Please select at least one image to upload.");
      return;
    }
    try {
      const photoData = await axios.get("http://localhost:9999/photos");
      const photos = photoData?.data || [];

      const newId = photos[photos.length - 1].id + 1;
      const newPhoto = photos[photos.length - 1].photoId + 1;
      const newImage = photos[photos.length - 1].images.imageId + 1;
      const newPhotos = {
        id: newId,
        photoId: newPhoto,
        title: title,
        images: {
          imageId: newImage,
          url: selectedFiles.map((file) => file?.name), // Store all file names as a flat array
          thumbnail: selectedFiles[0]?.name, // First file as the thumbnail
        },
        albumId: albumId,
        tags,
      };
      const createPhotosPromise = axios.post(
        "http://localhost:9999/photos",
        newPhotos
      );
      await Promise.all([createPhotosPromise]);
      window.location.reload();
      setUploadModalShow(false);
    } catch (error) {
      console.error("Error creating photo:", error);
      setError("Failed to create photo");
    }
  };

  const handleDeletePhoto = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this photo?"
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:9999/photos/${id}`);
        setPhotos(photos?.filter((photo) => photo?.id !== id));
      } catch (error) {
        console.error("Error deleting album:", error);
      }
    }
  };

  const handleDeleteImage = async (indexToDelete) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (confirmed) {
      const photoId = photos[currentPhotoIndex].id;
      const currentPhoto = photos[currentPhotoIndex];
  
      // Check if the photo has only one image
      if (currentPhoto.images.url.length === 1) {
        alert("Please delete the entire photo since it has only one image left.");
        return;
      }
  
      try {
        // Delete the image from the UI
        const updatedPhotos = photos.map((photo) =>
          photo.id === photoId
            ? {
                ...photo,
                images: {
                  ...photo.images,
                  url: photo.images.url.filter(
                    (_, index) => index !== indexToDelete
                  ),
                },
              }
            : photo
        );
        setPhotos(updatedPhotos);
  
        // Update the photo object on the server
        await axios.patch(`http://localhost:9999/photos/${photoId}`, {
          images: {
            ...currentPhoto.images,
            url: updatedPhotos.find((photo) => photo.id === photoId).images.url,
          },
        });
  
        // Move to the next image or close the modal if no more images
        handleNext();
      } catch (error) {
        console.error("Error deleting image:", error);
        setError("Failed to delete image");
      }
    }
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
        <Col md={12}>
          <div className='text-center mb-4'>
            <Button variant='primary' onClick={() => setUploadModalShow(true)}>
              Create new photo
            </Button>
          </div>
        </Col>
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
                        <div className='d-flex justify-content-between align-items-center mt-2 mb-2'></div>
                        <div className='text-center'>
                          <Button
                            variant='light'
                            className='mr-2'
                            onClick={() => handleEditClick(photo)}>
                            <i className='bi bi-pencil'></i> Edit
                          </Button>
                          <Button
                            variant='light'
                            className='mr-2'
                            onClick={() => handleDeletePhoto(photo?.photoId)}>
                            <i className='bi bi-trash'></i> Delete
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
        onDelete={() => handleDeleteImage(currentPhotoIndex)}
      />
      <PhotoUploadModal
        show={uploadModalShow}
        onHide={handleUploadModalClose}
        onCreate={handleCreatePhoto}
        title={title}
        setTitle={setTitle}
      />
    </Container>
  );
}
