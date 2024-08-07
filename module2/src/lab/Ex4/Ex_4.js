import React, { useEffect } from "react";
import HeaderLab from "./HeaderLab";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Ex4() {
  const [show, setShow] = React.useState(false);
  const [rangeValue, setRangeValue] = React.useState(0); // Default value for the slider

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  
  const handleRangeChange = (e) => {
    setRangeValue(e.target.value);
  };

  useEffect(() => {
    if (rangeValue === 100) {
      alert("You reached the maximum value!");
    }
  }, [rangeValue]);
  
  return (
    <>
      <HeaderLab />
      <Button variant='primary' onClick={handleOpen}>
        Open
      </Button>
      <div className='text-center'>
        <div>
          <h1>
            Hello <strong style={{ color: "blue" }}>React</strong>
          </h1>
        </div>
        <div>
          <img
            src='logo192.png'
            width='220'
            height='220'
            style={{ borderBottom: "solid blue 2px" }}
            className='d-inline-block align-top'
            alt='Logo'
          />
        </div>
        <div>
          <p style={{ color: "blue", fontStyle: "italic" }}>
            {" "}
            This is a react logo{" "}
          </p>
          <p style={{ fontWeight: "lighter", fontStyle: "italic" }}>
            (Something write here)
          </p>
          <p> This library for web and native user interfaces </p>
        </div>
      </div>
      <div
        className='modal show'
        style={{ display: "block", position: "relative" }}>
        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Modal body text goes here.</p>
            <Form>
              <Form.Label>Range: {rangeValue}%</Form.Label>
              <Form.Range
                value={rangeValue}
                onChange={handleRangeChange}
                min={0}
                max={100}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={handleClose}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
