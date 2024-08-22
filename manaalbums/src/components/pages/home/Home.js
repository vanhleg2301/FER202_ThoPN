import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import Pagination from "../../pagination/Pagination";
import Search from "./Search";
import Create from "../photo.js/Create";
import PhotoCard from "./PhotoCard";
import AlbumFilter from "./AlbumFilter";
import CommentModal from "./CommentModal";
import ShareFor from "./ShareFor";
import AuthContext from "../../../context/Context";
import "./Home.css";

const ITEMS_PER_PAGE = 15;

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [likedPhotos, setLikedPhotos] = useState({});
  const [likesData, setLikesData] = useState([]);
  const [sharedPhotos, setSharedPhotos] = useState([]);
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
  const { user } = useContext(AuthContext);

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

    const fetchLike = async () => {
      try {
        const response = await axios.get("http://localhost:9999/likes");
        setLikesData(response?.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const fetchShare = async () => {
      try {
        const response = await axios.get("http://localhost:9999/shares");
        setSharedPhotos(response?.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchPhotos();
    fetchUsers();
    fetchAlbums();
    fetchComments();
    fetchLike();
    fetchShare();
  }, []);

  // Xử lý Like
  const handleLike = async (photoId) => {
    try {
      const userId = user?.userId;
      if (!userId) {
        alert("User is not logged in");
        return;
      }

      let updatedLikesData = [...likesData]; // Create a copy of likesData
      const likeEntry = updatedLikesData.find(
        (like) => like?.photoId === Number(photoId)
      );

      if (likeEntry) {
        if (likeEntry?.userIds?.includes(userId)) {
          // User already liked, so unlike by removing the userId
          const updatedUserIds = likeEntry.userIds.filter(
            (id) => id !== userId
          );
          likeEntry.userIds = updatedUserIds;

          await axios.patch(`http://localhost:9999/likes/${likeEntry.id}`, {
            userIds: updatedUserIds,
          });
        } else {
          // User hasn't liked yet, so like by adding the userId
          const updatedUserIds = [...likeEntry.userIds, userId];
          likeEntry.userIds = updatedUserIds;

          await axios.patch(`http://localhost:9999/likes/${likeEntry.id}`, {
            userIds: updatedUserIds,
          });
        }
      } else {
        // No entry exists, create a new like entry
        const newLikeEntry = {
          photoId: Number(photoId),
          userIds: [userId],
        };

        const response = await axios.post(
          "http://localhost:9999/likes",
          newLikeEntry
        );
        updatedLikesData.push(response.data); // Add the new like entry to the likesData
      }

      // Update the state
      setLikedPhotos((prevLikes) => ({
        ...prevLikes,
        [photoId]: likeEntry ? likeEntry.userIds : [userId],
      }));
      setLikesData(updatedLikesData); // Update likesData state
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  // Xử lý Comments
  const handleComment = (photoId) => {
    const selectedPhoto = photos?.find((photo) => photo?.id === photoId);
    const relatedComments = commentsData?.filter(
      (comment) => comment?.photoId === photoId
    );
    setSelectedPhoto(selectedPhoto);
    setComments(relatedComments);
    setShowModal(true);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    const newCommentData = {
      photoId: selectedPhoto?.id,
      text: newComment,
      rate: newRating,
      userId: user?.userId,
    };

    try {
      // Send the new comment to the backend
      const response = await axios.post(
        "http://localhost:9999/comments",
        newCommentData
      );

      // Update the state with the newly created comment
      setCommentsData([...commentsData, response.data]);
      setComments([...comments, response.data]);

      // Clear the form inputs
      setNewComment("");
      setNewRating(1);
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment. Please try again.");
    }
  };

  // Xử lý Modal
  const handleClose = () => setShowModal(false);

  // Xử lý Album màn hình chính
  const handleAlbumSelect = (albumId) => {
    setSelectedAlbumId(albumId);
    setCurrentPage(1);
  };

  // Xử lý tên người sở hữu album
  const getUserNameByAlbumId = (albumId) => {
    const album = albums?.find((album) => album?.albumsId === albumId);
    const user = users?.find((user) => user?.id === album?.userId);
    return user?.name || "";
  };

  // Xử lý mô tả album
  const getAlbumDescription = (albumId) => {
    const album = albums.find((album) => album?.albumsId === albumId);
    return album?.description || "";
  };

  // filter photo theo album và search query
  const filteredPhotos = photos
    .filter(
      (photo) =>
        (!selectedAlbumId || photo?.albumId === selectedAlbumId) &&
        photo?.title?.toLowerCase().startsWith(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b?.date) - new Date(a?.date));

  // Xử lý phân trang
  const totalPages = Math.ceil(filteredPhotos?.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentPhotos = filteredPhotos
    ?.sort((a, b) => b.id - a.id)
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          {/*Search*/}
          <Search onSearch={(query) => setSearchQuery(query)} />
        </Col>
        <Col className='d-flex justify-content-center mt-3' md={12}>
          {/*Filter by album*/}
          <AlbumFilter
            albums={albums}
            selectedAlbumId={selectedAlbumId}
            handleAlbumSelect={handleAlbumSelect}
          />
        </Col>
      </Row>
      <Row className='mt-4'>
        {/*Photo card*/}
        <Col md={12}>
          <div className='photo-card-container'>
            {currentPhotos?.map((photo) => (
              <div key={photo?.id}>
                <PhotoCard
                  photo={photo}
                  likesData={likesData}
                  setLikesData={setLikesData}
                  likedPhotos={likedPhotos}
                  handleLike={handleLike}
                  handleComment={handleComment}
                  sharedPhotos={sharedPhotos}
                  users={users}
                  getUserNameByAlbumId={getUserNameByAlbumId}
                  getAlbumDescription={getAlbumDescription}
                  commentsData={commentsData}
                  albums={albums}
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>

      <Row>
      {/*Pagination*/}
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

      {/*CommentModal*/}
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
