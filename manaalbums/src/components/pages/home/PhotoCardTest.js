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
  handleLike,
  handleComment,
  handleShare,
  users,
  getUserNameByAlbumId,
  getAlbumDescription,
  commentsData,
  albums,
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
    const album = albums?.find((album) => album?.albumsId === albumId);
    if (album) {
      const user = users?.find((user) => user?.id === album?.userId);
      return user?.avatar || "logo192.png";
    }
    return "logo192.png";
  };

  const renderPhotoCard = (photoItem) => (
    <Card className='mt-4 mb-4' key={photoItem?.id}>
      <Card.Header>
        <Row>
          <Col xs={2}>
            <Image
              width={50}
              height={50}
              src={"/assets/images/" + getAvatarByAlbumId(photoItem?.albumId)}
              alt={getUserNameByAlbumId(photoItem?.albumId)}
              className='rounded-circle'
            />
          </Col>
          <Col xs={10}>
            <div>
              <strong>{getUserNameByAlbumId(photoItem?.albumId)}</strong>
            </div>
            <div className='text-muted'>
              {getAlbumDescription(photoItem?.albumId)}
            </div>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Link to={`photo/${photoItem?.id}`}>
          <Card.Img
            variant='top'
            src={
              photoItem?.images?.thumbnail.startsWith("http")
                ? photoItem?.images?.thumbnail
                : "/assets/images/" +
                  (photoItem?.images?.thumbnail || "logo192.png")
            }
            className='my-3'
          />
        </Link>
        <Card.Text className='text-muted'>
          <>
            <OverlayTrigger
              placement='top'
              overlay={
                <Tooltip id={`tooltip-like-${photoItem?.id}`}>
                  {getUserNamesWhoLiked(photoItem?.id) || "No likes yet"}
                </Tooltip>
              }>
              <span>
                {likesData?.find((like) => like?.photoId === photoItem?.id)
                  ?.userIds.length || 0}{" "}
                <i
                  className={
                    hasLiked(photoItem?.id) ? "bi bi-heart-fill" : "bi bi-heart"
                  }></i>{" "}
              </span>
            </OverlayTrigger>
          </>
          <>
            {commentsData?.filter((comment) => comment?.photoId === photoItem?.id)
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
              onClick={() => handleLike(photoItem?.id)}
              variant={hasLiked(photoItem?.id) ? "primary" : "light"}
              className='w-100 custom-button'
              style={{ borderRadius: "3px" }}>
              {hasLiked(photoItem?.id) ? "Liked" : "Like"}
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => handleComment(photoItem?.id)}
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
              style={{ borderRadius: "0" }}
              onClick={handleShare}>
              Share
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );

  // If photo is an array, map through it; if it's a single object, just render it
  return Array.isArray(photo)
    ? photo.map((photoItem) => renderPhotoCard(photoItem))
    : renderPhotoCard(photo);
}
