import React, { useContext, useState } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";
import AuthContext from "../../../context/Context";
import axios from "axios";

export default function Create({ show, handleModalCreateClose }) {
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]); // State to store tags
  const [imagePreviews, setImagePreviews] = useState([]); // State to store image previews
  const [files, setFiles] = useState([]); // State to store file objects
  const { user } = useContext(AuthContext);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create an album.");
      return;
    }

    if (!description.trim()) {
      alert("Description cannot be empty.");
      return;
    }

    if (files.length === 0) {
      alert("Please select at least one image to upload.");
      return;
    }

    try {
      // Fetch existing albums and photos data
      const albumData = await axios.get("http://localhost:9999/albums");
      const albums = albumData?.data || [];
      const photoData = await axios.get("http://localhost:9999/photos");
      const photos = photoData?.data || [];

      const userAlbumExists = albums.some(
        (a) => a.description === description && a.userId === user.userId
      );

      if (userAlbumExists) {
        alert("An album with this description already exists.");
        return;
      }

      // Generate new IDs based on existing data
      const newAlbumId = albums[albums.length - 1].albumsId + 1;
      const newId = photos[photos.length - 1].id + 1;
      const newPhoto = photos[photos.length - 1].photoId + 1;
      const newImage = photos[photos.length - 1].images.imageId + 1;

      // // Convert each file to a base64 string
      // const base64Files = await Promise.all(
      //   files.map((file) => {
      //     return new Promise((resolve, reject) => {
      //       const reader = new FileReader();
      //       reader.readAsDataURL(file);
      //       reader.onload = () => resolve(reader.result);
      //       reader.onerror = (error) => reject(error);
      //     });
      //   })
      // );
      
      // Prepare form data for album creation
      const albumDataToSend = {
        id: newAlbumId,
        albumsId: newAlbumId,
        description,
        userId: user?.userId,
      };

      // Prepare photo data
      const newPhotos = {
        id: newId,
        photoId: newPhoto,
        title: description,
        images: {
          imageId: newImage,
          url: files.map((file) => file?.name), // Store all file names as a flat array
          thumbnail: files[0]?.name, // First file as the thumbnail
        },
        albumId: newAlbumId,
        tags,
      };

      // Create promises for each request
      const createAlbumPromise = axios.post(
        "http://localhost:9999/albums",
        albumDataToSend
      );
      const createPhotosPromise = axios.post(
        "http://localhost:9999/photos",
        newPhotos
      );

      // Use Promise.all to wait for both requests to complete
      await Promise.all([createAlbumPromise, createPhotosPromise]);

      // Upload images to "/assets/images" folder

      // Reset form fields
      setDescription("");
      setImagePreviews([]);
      setFiles([]);
      alert("Album created successfully.");
      window.location.reload(); // Refresh page to display new album
      handleModalCreateClose(); // Close modal
    } catch (error) {
      console.error("Error creating album:", error);
      alert("Failed to create album. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Store file objects
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    setFiles(selectedFiles); // Store file objects
  };

  return (
    <Modal show={show} onHide={handleModalCreateClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Modal.Title className='mb-4'>Create Album</Modal.Title>
        <Card>
          <Card.Body>
            <div className='d-flex align-items-start mb-3'>
              <div className='mr-2'>
                <img
                  accept='.jpg, .jpeg, .png'
                  src={"/assets/images/" + (user?.avatar || "logo192.png")} // Replace with actual user profile image URL
                  alt='Profile'
                  className='rounded-circle'
                  width='40'
                  height='40'
                />
              </div>
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                as='textarea'
                placeholder='Description album...'
                className='ml-3'
                style={{ height: "60px", borderRadius: "20px" }}
              />
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <Form.Group className='mr-2' style={{ display: "inline-block" }}>
                <Form.Label className='btn btn-light'>
                  <i className='bi bi-image'></i> Photo
                  <Form.Control
                    type='file'
                    multiple
                    onChange={handleImageChange}
                    accept='image/*'
                    style={{ display: "none" }}
                  />
                </Form.Label>
                <Form.Label className='btn btn-light'>
                  <i className='bi bi-emoji-smile'></i> Feeling
                </Form.Label>
              </Form.Group>
              <Button variant='primary' onClick={handleCreate}>
                Post
              </Button>
            </div>
            {/* Display image previews */}
            {imagePreviews.length > 0 && (
              <div className='d-flex flex-wrap mt-3'>
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`preview-${index}`}
                    className='img-thumbnail mr-2'
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
            )}
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}
