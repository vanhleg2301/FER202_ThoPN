import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import Pagination from "../../pagination/Pagination";
import Search from "./Search";
import Create from "../photo.js/Create";
import PhotoCard from "./PhotoCard";
import AlbumFilter from "./AlbumFilter";
import CommentModal from "./CommentModal";
import ShareFor from "./ShareFor";

const ITEMS_PER_PAGE = 3;

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
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(1);

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
        console.error("Error fetching comments:", error);
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

  const handleComment = (photoId) => {
    const selectedPhoto = photos?.find((photo) => photo?.id === photoId);
    const relatedComments = commentsData?.filter(
      (comment) => comment?.photoId === photoId
    );
    setSelectedPhoto(selectedPhoto);
    setComments(relatedComments);
    setShowModal(true);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newCommentData = {
      id: commentsData?.length + 1,
      photoId: selectedPhoto?.id,
      text: newComment,
      rate: newRating,
      username: "Current User", // Replace with actual user data
    };
    setCommentsData([...commentsData, newCommentData]);
    setComments([...comments, newCommentData]);
    setNewComment("");
    setNewRating(1);
  };

  const handleClose = () => setShowModal(false);

  const handleAlbumSelect = (albumId) => {
    setSelectedAlbumId(albumId);
    setCurrentPage(1);
  };

  const getUserNameByAlbumId = (albumId) => {
    const album = albums?.find((album) => album?.albumsId === albumId);
    const user = users?.find((user) => user?.id === album?.userId);
    return user?.name || "";
  };

  const getAlbumDescription = (albumId) => {
    const album = albums.find((album) => album?.albumsId === albumId);
    return album?.description || "";
  };

  const filteredPhotos = photos
    .filter(
      (photo) =>
        (!selectedAlbumId || photo?.albumId === selectedAlbumId) &&
        photo?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b?.date) - new Date(a?.date));

  const totalPages = Math.ceil(filteredPhotos?.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentPhotos = filteredPhotos?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container fluid className='mt-4'>
      <Row>
        <Col md={2}></Col>

        <Col md={8} className='d-flex justify-content-center'>
          <AlbumFilter
            albums={albums}
            selectedAlbumId={selectedAlbumId}
            handleAlbumSelect={handleAlbumSelect}
          />
        </Col>
        <Col md={2}></Col>
      </Row>
      <Row>
        <Col md={2}>
          <Search onSearch={(query) => setSearchQuery(query)} />
        </Col>
        <Col md={8}>
          <div>
            <Create />
          </div>

          <div className='mt-3'>
            {currentPhotos?.map((photo) => (
              <PhotoCard
                key={photo?.id}
                photo={photo}
                likedPhotos={likedPhotos}
                handleLike={handleLike}
                handleComment={handleComment}
                getUserNameByAlbumId={getUserNameByAlbumId}
                getAlbumDescription={getAlbumDescription}
                commentsData={commentsData}
              />
            ))}
          </div>
        </Col>
        <Col md={2}>
          <ShareFor />
        </Col>
      </Row>

      <Row>
        <Col className='text-center'>
          <Pagination
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={filteredPhotos?.length}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
        </Col>
      </Row>

      <CommentModal
        users={users}
        showModal={showModal}
        handleClose={handleClose}
        selectedPhoto={selectedPhoto}
        comments={comments}
        newComment={newComment}
        setNewComment={setNewComment}
        newRating={newRating}
        setNewRating={setNewRating}
        handleCommentSubmit={handleCommentSubmit}
      />
    </Container>
  );
}
