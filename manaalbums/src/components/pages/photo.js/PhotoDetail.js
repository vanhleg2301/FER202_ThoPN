import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { renderStars } from '../../../util/renderRate'; // Import your utility function for rendering stars

export default function PhotoDetail() {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/photos/${photoId}`);
        setPhoto(response?.data);
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/comments?photoId=${photoId}`);
        setComments(response?.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9999/users");
        setUsers(response?.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchPhoto();
    fetchComments();
    fetchUsers();
  }, [photoId]);

  const getUserNameById = (userId) => {
    const user = users?.find((user) => user?.userId === userId);
    return user ? user?.name : "Unknown User";
  };

  return (
    <div className='container mt-4'>
      {photo && (
        <Card>
          <Card.Img variant='top' src='logo192.png' alt={photo?.title} />
          <Card.Body>
            <Card.Title>{photo?.title}</Card.Title>
            <Card.Text>{photo?.description}</Card.Text>
          </Card.Body>
        </Card>
      )}

      <div className='mt-3'>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className='mb-3'
              style={{
                backgroundColor: "lightGray",
                borderRadius: "7px",
                paddingTop: "20px",
                paddingLeft: "20px",
                paddingBottom: "5px",
              }}>
              <strong>{getUserNameById(comment.userId)}</strong>
              <div>{renderStars(comment.rate)}</div>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
}
