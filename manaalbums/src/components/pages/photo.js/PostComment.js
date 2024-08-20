import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap"; // Sử dụng Form từ react-bootstrap
import AuthContext from "../../../context/Context";

export default function PostComment({ photoId, setComments }) {
  const {user} = useContext(AuthContext)
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(1); // Default rating

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual user ID from your authentication system
      const userId = user?.userId;
      await axios.post("http://localhost:9999/comments", {
        photoId: Number(photoId),
        userId: userId,
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

  return (
    <div className='mt-4'>
      <Form onSubmit={handleCommentSubmit}>
        <Form.Group controlId='formComment'>
          <Form.Label>Your Comment</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
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
  );
}
