import React, { useContext } from "react";
import { Modal, Card, Form, Button } from "react-bootstrap";
import { renderStars } from "../../../util/renderRate";
import AuthContext from "../../../context/Context";

export default function CommentModal({
  users,
  showModal,
  handleClose,
  selectedPhoto,
  comments,
  newComment,
  setNewComment,
  newRating,
  setNewRating,
  handleCommentSubmit,
}) {
  const { user } = useContext(AuthContext);

  // Function to get user name by user ID
  const getUserName = (userId) => {
    const userCom = users.find((u) => u.id === userId); // Make sure this property matches the actual user ID in the `users` array
    return userCom?.name || "Unknown User";
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        {selectedPhoto && (
          <>
            <Card>
              <Card.Img
                variant="top"
                src="logo192.png"
                alt={selectedPhoto?.title}
              />
              <Card.Body>
                <Card.Title>{selectedPhoto?.title}</Card.Title>
              </Card.Body>
            </Card>
            <div className="mt-3">
            <Modal.Title className="mb-4">Comments</Modal.Title>
              {comments?.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment?.id}
                    className="mb-3"
                    style={{
                      backgroundColor: "lightGray",
                      borderRadius: "7px",
                      paddingTop: "20px",
                      paddingLeft: "20px",
                      paddingBottom: "5px",
                    }}
                  >
                    <strong>{getUserName(comment?.userId)}</strong>
                    <div>{renderStars(comment?.rate)}</div>
                    <p>{comment?.text}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>
          </>
        )}
      </Modal.Body>
      {user && (
        <Modal.Footer>
          <Form onSubmit={handleCommentSubmit} className="w-100">
            <Form.Group controlId="commentText">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="commentRating" className="mt-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
              >
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </Form.Control>
            </Form.Group>
            <div className="mt-3 d-flex justify-content-end">
              <Button type="submit" variant="primary">
                Post Comment
              </Button>
              <Button variant="secondary" onClick={handleClose} className="ms-2">
                Close
              </Button>
            </div>
          </Form>
        </Modal.Footer>
      )}
    </Modal>
  );
}
