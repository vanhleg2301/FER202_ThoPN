import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { renderStars } from "../../../util/renderRate"; // Import your utility function for rendering stars

export default function PhotoDetail() {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);
  const [album, setAlbum] = useState(null); // State for album details
  const [uploader, setUploader] = useState(null); // State for uploader details
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(1); // Default rating
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const itemsPerPage = 2; // Number of thumbnails per page

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/photos/${photoId}`
        );
        const photoData = response?.data;
        setPhoto(photoData);
        setMainImage(photoData.images.url[0]); // Set the first image as the main image

        // Fetch album details using albumId from the photo
        if (photoData?.albumId) {
          const albumResponse = await axios.get(
            `http://localhost:9999/albums/${photoData.albumId}`
          );
          const albumData = albumResponse?.data;
          setAlbum(albumData);

          // Fetch uploader details using userId from the album
          if (albumData?.userId) {
            const userResponse = await axios.get(
              `http://localhost:9999/users/${albumData.userId}`
            );
            setUploader(userResponse?.data);
          }
        }
      } catch (error) {
        console.error("Error fetching photo, album, or uploader:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/comments?photoId=${photoId}`
        );
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

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual user ID from your authentication system
      const userId = 1;
      await axios.post("http://localhost:9999/comments", {
        photoId,
        userId,
        text: newComment,
        rate: newRating,
      });
      // Clear form inputs
      setNewComment("");
      setNewRating(1);
      // Refresh comments
      const response = await axios.get(
        `http://localhost:9999/comments?photoId=${photoId}`
      );
      setComments(response?.data);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Calculate the range of thumbnails to display
  const totalThumbnails = photo?.images?.url?.length || 0;
  const totalPages = Math.ceil(totalThumbnails / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const thumbnailsToDisplay = photo?.images?.url?.slice(startIndex, endIndex);

  return (
    <div className='container mt-4 mb-4'>
      <Row>
        <Col md={8}>
          {photo && (
            <Card>
              <Card.Img
                height={300}
                variant='top'
                src={mainImage}
                alt={photo?.title}
              />
              <Card.Body>
                <Card.Title>{photo?.title}</Card.Title>
                <Card.Text>{photo?.description}</Card.Text>
              </Card.Body>
            </Card>
          )}
          <div>
            <div className='mt-3'>
              {thumbnailsToDisplay?.length > 0 && (
                <div className='d-flex flex-wrap justify-content-center'>
                  {thumbnailsToDisplay.map((imageUrl, index) => (
                    <div key={index} className='p-1'>
                      {imageUrl !== mainImage && (
                        <img
                          src={imageUrl}
                          alt={`Thumbnail ${index}`}
                          style={{
                            width: "100px",
                            height: "auto",
                            cursor: "pointer",
                          }}
                          onClick={() => handleThumbnailClick(imageUrl)}
                          className='img-thumbnail'
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className='mt-3 d-flex justify-content-between'>
              <Button
                variant='secondary'
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}>
                Previous
              </Button>
              <Button
                variant='secondary'
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div>
            <Card>
              {uploader && (
                <Card.Text>
                  <strong>Uploaded by:</strong> {uploader?.name}
                </Card.Text>
              )}
              {album && (
                <Card.Text>
                  <strong>Album:</strong> {album?.description}
                </Card.Text>
              )}
            </Card>
          </div>
        </Col>
      </Row>

      <div className='mt-4'>
        <h3>Comments</h3>
        {comments?.length > 0 ? (
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

      <div className='mt-4'>
        <Form onSubmit={handleCommentSubmit}>
          <Form.Group controlId='formComment'>
            <Form.Label>Your Comment</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formRating' className='mt-3'>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as='select'
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Star{rating > 1 ? "s" : ""}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant='primary' type='submit' className='mt-3'>
            Post Comment
          </Button>
        </Form>
      </div>
    </div>
  );
}
