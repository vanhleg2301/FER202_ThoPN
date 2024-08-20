import React, { useContext } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/Context";

export default function PhotoCard({
  photo,
  likesData,
  // setLikesData,
  // likedPhotos,
  handleLike,
  handleComment,
  users,
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

  // Function to get the names of users who liked the photo
  const getUserNamesWhoLiked = (photoId) => {
    const photoLikes = likesData?.find((like) => like?.photoId === photoId);
    const userIds = photoLikes?.userIds || [];
    return userIds
      .map((id) => users?.find((user) => user?.userId === id)?.name)
      .join(", ");
  };

  const getAvatarByAlbumId = (albumId) => {
    const user = users?.find((user) => user?.id === albumId);
    return user?.avatar;
  };

  return (
    <Col md={12}>
      <Card className='mt-4 mb-4'>
        <Card.Header>
          <Row>
            <Col xs={1}>
              <Image
                width={50}
                height={50}
                src={"/assets/images/" + getAvatarByAlbumId(photo?.albumId)}
                alt={getUserNameByAlbumId(photo?.albumId)}
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
            <>
              <OverlayTrigger
                placement='top'
                overlay={
                  <Tooltip id={`tooltip-like-${photo?.id}`}>
                    {getUserNamesWhoLiked(photo?.id) || "No likes yet"}
                  </Tooltip>
                }>
                <span>
                  {likesData?.find((like) => like?.photoId === photo?.id)
                    ?.userIds.length || 0}{" "}
                  <i
                    className={
                      hasLiked(photo?.id) ? "bi bi-heart-fill" : "bi bi-heart"
                    }></i>{" "}
                </span>
              </OverlayTrigger>
            </>
            <>
              {commentsData?.filter((comment) => comment?.photoId === photo?.id)
                .length || 0}{" "}
              <i className='bi bi-chat-dots'></i> · 0{" "}
            </>
            <>
              {" "}
              <i className='bi bi-share'></i>
            </>
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
