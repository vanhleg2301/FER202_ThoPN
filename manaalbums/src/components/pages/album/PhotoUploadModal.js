import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function PhotoUploadModal({ show, onHide, onCreate, title, setTitle }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleCreate = () => {
    onCreate(selectedFiles);
    setSelectedFiles([]);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload New Photos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          as='textarea'
          placeholder='Description album...'
          className='ml-3'
          style={{ height: "60px", borderRadius: "20px" }}
        />
        <Form.Group controlId='formFile'>
          <Form.Label>Select Photos</Form.Label>
          <Form.Control type='file' multiple onChange={handleFileChange} />
        </Form.Group>
        <div className='mt-3'>
          {selectedFiles.length > 0 && (
            <div>
              <h5>Preview:</h5>
              {selectedFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "10px",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancel
        </Button>
        <Button variant='primary' onClick={handleCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
