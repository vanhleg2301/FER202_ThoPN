import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function CreateModal({ show, handleClose, onImageChange }) {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    onImageChange(e.target.files);
    // Generate previews for the selected images
    const previews = files?.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle image upload logic here
    console.log(images);
    handleClose(); // Close the modal after submission
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formFileMultiple' className='mb-3'>
            <Button variant='light' className='d-block mb-2'>
              <Form.Control
                type='file'
                multiple
                onChange={handleImageChange}
                accept='image/*'
                style={{ display: "none" }} // Hide the actual input
              />
              <Form.Label>Choose Images</Form.Label>
            </Button>
          </Form.Group>

          {/* Display image previews */}
          <div className='mb-3'>
            {imagePreviews?.length > 0 && (
              <div className='d-flex flex-wrap'>
                {imagePreviews?.map((preview, index) => (
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
          </div>

          <Button variant='primary' type='submit'>
            Chose Images
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
