import React from "react";
import { Card, Form, Button } from "react-bootstrap";

export default function Create() {
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
              as='textarea'
              placeholder='Description album...'
              className='ml-3'
              style={{ height: "10px", borderRadius: "20px" }}
            />
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <Button variant='light' className='mr-2'>
                <i className='bi bi-image'></i> Photo
              </Button>
              <Button variant='light' className='mr-2'>
                <i className='bi bi-emoji-smile'></i> Feeling
              </Button>
            </div>
            <Button variant='primary'>Post</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
