import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function AlbumPhotoModal({
  show,
  onHide,
  photo,
  onPrevious,
  onNext,
  selectImage,
  onDelete,
}) {
  return (
    <Modal show={show} onHide={onHide} size='lg' centered>
      <Modal.Body>
        <div className='d-flex justify-content-center align-items-center'>
          <Button variant='light' onClick={onPrevious}>
            &lt;
          </Button>
          <img
            src={
              selectImage?.startsWith("http")
                ? selectImage
                : `/assets/images/${selectImage}`
            }
            alt={photo?.title}
            style={{
              width: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
          <Button variant='light' onClick={onNext}>
            &gt;
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button variant='light' onClick={onDelete}>
            <i className='bi bi-trash'></i> Delete
          </Button>
        </div>
        <div>
          <Button variant='secondary' onClick={onHide}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
