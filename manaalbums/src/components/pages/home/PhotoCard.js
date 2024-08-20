import React, { useContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/Context";

export default function PhotoCard({
  photo,
  likesData,
  setLikesData,
  likedPhotos,
  handleLike,
  handleComment,
  getUserNameByAlbumId,
  getAlbumDescription,
  commentsData,
}) {
  const { user } = useContext(AuthContext);

  // Function to check if the user has liked the photo
  const hasLiked = (photoId) => {
    const photoLikes = likesData?.find((like) => like?.photoId === photoId);
    return photoLikes?.userIds?.includes(user?.userId);
  };

  return (
    <Col md={12}>
      <Card className='mt-4 mb-4'>
        <Card.Header>
          <Row>
            <Col xs={1}>
              <img
                width={50}
                height={50}
                src='logo192.png'
                alt='User Profile'
                className='rounded-circle'
              />
            </Col>
            <Col xs={11}>
              <div>
                <strong>{getUserNameByAlbumId(photo?.albumId)}</strong>
              </div>
              <div className='text-muted' style={{ fontSize: "0.9rem" }}>
                {getAlbumDescription(photo?.albumId)}
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>{photo?.title}</Card.Title>
          <Link to={`photo/${photo?.id}`}>
            <Card.Img
              variant='top'
              src={
                photo?.images?.thumbnail.startsWith("http")
                  ? photo?.images?.thumbnail
                  : "/assets/images/" + photo?.images?.thumbnail
              }
              className='my-3'
            />
          </Link>
          <Card.Text className='text-muted'>
            {likesData.find((like) => like.photoId === photo?.id)?.userIds
              .length || 0}{" "}
            <i
              className={
                hasLiked(photo?.id) ? "bi bi-heart-fill" : "bi bi-heart"
              }></i>{" "}
            {commentsData?.filter((comment) => comment?.photoId === photo?.id)
              .length || 0}{" "}
            <i className='bi bi-chat-dots'></i> · 0{" "}
            <i className='bi bi-share'></i>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row className='text-center'>
            <Col>
              <Button
                onClick={() => handleLike(photo?.id)}
                variant={hasLiked(photo?.id) ? "primary" : "light"}
                className='w-100 custom-button'
                style={{ borderRadius: "3px" }}>
                {hasLiked(photo?.id) ? "Liked" : "Like"}
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => handleComment(photo?.id)}
                variant='light'
                className='w-100 custom-button'
                style={{ borderRadius: "0" }}>
                Comment
              </Button>
            </Col>
            <Col>
              <Button
                variant='light'
                className='w-100 custom-button'
                style={{ borderRadius: "0" }}>
                Share
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
}
