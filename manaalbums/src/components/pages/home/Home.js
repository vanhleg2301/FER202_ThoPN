import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import ShareFor from "./ShareFor";
import Pagination from "../../pagination/Pagination";
import { renderStars } from "../../../util/renderRate";
import Search from "./Search";
import Create from "../photo.js/Create";

const ITEMS_PER_PAGE = 3; // Define how many items you want per page

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [likedPhotos, setLikedPhotos] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("http://localhost:9999/photos");
        setPhotos(response?.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
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

    const fetchAlbums = async () => {
      try {
        const response = await axios.get("http://localhost:9999/albums");
        setAlbums(response?.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:9999/comments");
        setCommentsData(response?.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchPhotos();
    fetchUsers();
    fetchAlbums();
    fetchComments();
  }, []);

  const handleLike = (photoId) => {
    setLikedPhotos((prevLikedPhotos) => ({
      ...prevLikedPhotos,
      [photoId]: !prevLikedPhotos[photoId],
    }));
  };

  const handleComment = async (photoId) => {
    const selectedPhotoData = photos.find((photo) => photo?.id === photoId);
    setSelectedPhoto(selectedPhotoData);
    setShowModal(true);

    try {
      const response = await axios.get(
        `http://localhost:9999/comments?photoId=${photoId}`
      );
      const commentsData = response.data;

      const commentsWithUsernames = commentsData.map((comment) => {
        const user = users.find((user) => user?.userId === comment?.userId);
        return {
          ...comment,
          username: user ? user?.name : "Unknown User",
        };
      });

      setComments(commentsWithUsernames);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setComments([]);
  };

  const handleAlbumSelect = (albumId) => {
    setSelectedAlbumId(albumId);
    setCurrentPage(1); // Reset to the first page when album is changed
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when search query is changed
  };

  const filteredPhotos = photos.filter(
    (photo) =>
      photo?.title?.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
      (!selectedAlbumId || photo?.albumId === selectedAlbumId)
  );

  const getAlbumDescription = (albumId) => {
    const album = albums.find((album) => album?.albumsId === albumId);
    return album ? album?.description : "Unknown Album";
  };

  const getUserNameByAlbumId = (albumId) => {
    const album = albums.find((album) => album?.albumsId === albumId);
    const user = users.find((user) => user?.userId === album?.userId);
    return user ? user.name : "Unknown User";
  };

  const indexOfLastPhoto = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstPhoto = indexOfLastPhoto - ITEMS_PER_PAGE;
  const currentPhotos = filteredPhotos?.slice(
    indexOfFirstPhoto,
    indexOfLastPhoto
  );
  const totalPages = Math.ceil(filteredPhotos?.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container fluid className='mt-4'>
      <Row>
        <Col sm={12} md={2}>
          <div>
            <Search onSearch={handleSearch} />
          </div>
        </Col>
        <Col sm={12} md={8}>
          <div className='text-center'>
            {albums?.map((album) => (
              <Button
                key={album?.albumsId}
                onClick={() => handleAlbumSelect(album?.albumsId)}
                variant={
                  selectedAlbumId === album?.albumsId
                    ? "primary"
                    : "outline-primary"
                }
                className='mx-1'>
                {album?.description}
              </Button>
            ))}
          </div>
          <Row>
            <Col md={12}>
              <Create />
            </Col>
          </Row>
          <Row>
            {currentPhotos?.map((photo) => (
              <Col md={12} key={photo?.id}>
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
                          <strong>
                            {getUserNameByAlbumId(photo?.albumId)}
                          </strong>
                        </div>
                        <div
                          className='text-muted'
                          style={{ fontSize: "0.9rem" }}>
                          {getAlbumDescription(photo?.albumId)}
                        </div>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{photo?.title}</Card.Title>
                    <Link to={`photo/${photo?.id}`}>
                      <Card.Img
                        height={300}
                        variant='top'
                        src='logo192.png'
                        className='my-3'
                      />
                    </Link>

                    <Card.Text className='text-muted'>
                      {likedPhotos[photo?.id] ? (
                        <>
                          1 <i className='bi bi-heart-fill'></i>
                        </>
                      ) : (
                        <>
                          0 <i className='bi bi-heart'></i>
                        </>
                      )}{" "}
                      {
                        commentsData?.filter(
                          (comment) => comment?.photoId === photo?.id
                        ).length
                      }{" "}
                      <i class='bi bi-chat-dots'></i> · 0{" "}
                      <i class='bi bi-share'></i>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Row className='text-center'>
                      <Col>
                        <Button
                          onClick={() => handleLike(photo?.id)}
                          variant={
                            likedPhotos[photo?.id] ? "primary" : "light"
                          }
                          className='w-100 custom-button'
                          style={{ borderRadius: "3px" }}>
                          {likedPhotos[photo?.id] ? "Liked" : "Like"}
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
            ))}
          </Row>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
        <Col md={2}>
          <ShareFor />
        </Col>
      </Row>

      {/* Open dialog */}
      <Modal show={showModal} onHide={handleClose}>
        <Row>
          <Col md={12}>
            <Modal.Header closeButton>
              <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedPhoto && (
                <>
                  <Card>
                    <Card.Img
                      variant='top'
                      src='logo192.png'
                      alt={selectedPhoto?.title}
                    />
                    <Card.Body>
                      <Card.Title>{selectedPhoto?.title}</Card.Title>
                    </Card.Body>
                  </Card>
                  <div className='mt-3'>
                    {comments?.length > 0 ? (
                      comments?.map((comment) => (
                        <div
                          key={comment?.id}
                          className='mb-3'
                          style={{
                            backgroundColor: "lightGray",
                            borderRadius: "7px",
                            paddingTop: "20px",
                            paddingLeft: "20px",
                            paddingBottom: "5px",
                          }}>
                          <strong>{comment?.username}</strong>
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
            <Modal.Footer>
              <Form.Control
                type='text'
                placeholder='Add a comment...'
                // You can handle the new comment input here
              />
              <Button variant='primary' onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Col>
        </Row>
      </Modal>
    </Container>
  );
}
