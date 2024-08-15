import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Button, ListGroup, Alert, Spinner, Tooltip, OverlayTrigger } from "react-bootstrap";
import "./ChatRoom.css";
import axios from "axios";
import AuthContext from "../../../context/Context";

const CHAT_API_URL = "http://localhost:9999/chats";

export default function ChatRoom() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatId, setChatId] = useState(null);

  // Lấy dữ liệu chat khi component được mount
  useEffect(() => {
    if (!user) {
      setError("Login to view chat");
      setLoading(false);
      return;
    }

    axios
      .get(CHAT_API_URL)
      .then((response) => {
        // Tìm cuộc trò chuyện với receiverId dựa trên userId hiện tại
        const chat = response?.data?.find(chat =>
          (chat?.senderId === user?.id || chat?.receiverId === user?.id)
        );
        if (chat) {
          setChatId(chat?.id);
          setMessages(chat?.messages);
        } else {
          setError("No chat found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching chat data:", error);
        setError("Error fetching chat data");
        setLoading(false);
      });
  }, [user]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage?.trim()) {
      const message = {
        userSenderId: user?.id,
        text: newMessage,
        timestamp: new Date().toISOString(),
      };

      // Cập nhật tin nhắn trên server
      axios
        .put(`${CHAT_API_URL}/${chatId}`, {
          messages: [...messages, message],
          senderId: user?.id,
          receiverId: user?.id, // Thay bằng ID của người nhận
        })
        .then(() => {
          setMessages([...messages, message]);
          setNewMessage("");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          setError("Error sending message");
        });
    }
  };

  if (loading) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center mt-4">
            <Spinner animation="border" />
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Alert variant="danger" className="text-center mt-4">
              {error}
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="chat-room">
      <Row>
        <Col md={12} className="chat-messages">
          <ListGroup variant="flush">
            {messages.map((msg, index) => (
              <ListGroup.Item
                key={index}
                className={msg?.userSenderId === user?.id ? "sent" : "received"}>
                <div>
                  <p className="message-text">
                    {msg?.text}
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Additional Information</Tooltip>}
                    >
                      <span className="info-icon">?</span>
                    </OverlayTrigger>
                  </p>
                  <p className="message-time">
                    {new Date(msg?.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Form onSubmit={handleSendMessage}>
            <Form.Group controlId="messageInput">
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
