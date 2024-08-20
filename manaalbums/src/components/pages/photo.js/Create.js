import React, { useContext, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import AuthContext from "../../../context/Context";
import axios from "axios";
import CreateModal from "./CreateModal"; // Import the CreateModal component

export default function Create() {
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [imagePreviews, setImagePreviews] = useState([]); // State to store image previews
  const [files, setFiles] = useState([]); // State to store file objects
  const { user } = useContext(AuthContext);

  const handleCreate = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user) {
      alert("You must be logged in to create an album.");
      return;
    }

    // Check if the description is empty
    if (!description.trim()) {
      alert("Description cannot be empty.");
      return;
    }

    try {
      const albumData = await axios.get("http://localhost:9999/albums");
      const albums = albumData?.data || [];
      const photoData = await axios.get("http://localhost:9999/photos");
      const photos = photoData?.data || [];

      // Check if an album with the same description already exists
      const userAlbumExists = albums?.some(
        (a) => a?.description === description && a?.userId === user?.userId
      );

      if (userAlbumExists) {
        alert("An album with this description already exists.");
        return;
      }

      // Generate new IDs
      const newAlbumId = (albums?.length > 0 ? albums[albums?.length - 1].albumsId + 1 : 1);
      const newPhotoId = (photos?.length > 0 ? photos[photos?.length - 1].photoId + 1 : 1);

      // Create a new album
      await axios.post("http://localhost:9999/albums", {
        id: newAlbumId,
        albumsId: newAlbumId,
        description,
        userId: user?.userId,
      });

      // Create a single photo entry with multiple URLs
      if (files?.length > 0) {
        await axios.post("http://localhost:9999/photos", {
          id: newPhotoId,
          photoId: newPhotoId,
          title: description,
          images: {
            imageId: newPhotoId,
            url: files?.map((file) => file.name), // Use file names
            thumbnail: files[0].name, // Optionally store the first preview as thumbnail
          },
          // activity: {
          //   likes: 0,
          //   comments: 0,
          //   shares: 0,
          // },
          albumId: newAlbumId,
        });
      }

      // Clear the form
      setDescription("");
      setImagePreviews([]); // Clear the image previews
      setFiles([]); // Clear the file objects
      alert("Album created successfully.");
      window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
      console.error("Error creating album:", error);
      alert("Failed to create album. Please try again.");
    }
  };

  const handleImageChange = (files) => {
    // Generate previews for the selected images and store the file objects
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    setFiles(Array.from(files)); // Store file objects
  };

  return (
    <div className='mt-4'>
      <Card>
        <Card.Body>
          <div className='d-flex align-items-start mb-3'>
            <div className='mr-2'>
              <img
                src='https://via.placeholder.com/50' // Replace with actual user profile image URL
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
              style={{ height: "100px", borderRadius: "20px" }}
            />
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <Button variant='light' className='mr-2' onClick={() => setShowModal(true)}>
                <i className='bi bi-image'></i> Photo
              </Button>
              <Button variant='light' className='mr-2'>
                <i className='bi bi-emoji-smile'></i> Feeling
              </Button>
            </div>
            <Button variant='primary' onClick={handleCreate}>
              Post
            </Button>
          </div>
          {/* Display image previews */}
          {imagePreviews?.length > 0 && (
            <div className='d-flex flex-wrap mt-3'>
              {imagePreviews?.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`preview-${index}`}
                  className='img-thumbnail mr-2'
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
      {/* Include the CreateModal component here */}
      <CreateModal show={showModal} handleClose={() => setShowModal(false)} onImageChange={handleImageChange} />
    </div>
  );
}
