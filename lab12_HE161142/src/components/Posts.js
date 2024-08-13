import React, { useEffect, useState } from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import UserData from "../data/users.json";
import PostData from "../data/posts.json";
import { Link } from "react-router-dom";

export default function Posts() {
  const [user] = useState(UserData);
  const [post] = useState(PostData);
  const [userSelected, setUserSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(user);

  // set default active phần tử đầu tiên 
  const useDefaultActiveKey = user
    .filter((u) => u?.id === 1)
    .map((u) => u?.id.toString());

  useEffect(() => {
    // Lấy ra convert name thành chữ thường và
    // Nếu search có chứa trong name thì gán vào biến filtered
    const filtered = user?.filter((u) =>
      u?.name?.toLowerCase().startsWith(search?.toLowerCase())
    );

    // set biến filteredUsers bằng biến filtered để render ra giao diện
    setFilteredUsers(filtered);
  }, [search, user]); // gọi lại useEffect khi search, user thay đổi

  // Nếu ko select all thì filter ra posts của user đó
  const filteredPosts = post?.filter((p) =>
    userSelected === "All" ? true : p?.userId === parseInt(userSelected)
  );

  return (
    <>
      <div className='mt-4'>
        <Row>
          <Col md={3}>
            <h2>Filter by user</h2>
          </Col>
          <Col md={9}>
            <h2>List posts of user</h2>
          </Col>
        </Row>
        {/*Search*/}
        <Row className='mb-4'>
          <Col md={{ span: 9, offset: 3 }}>
            <Form.Control
              type='text'
              placeholder='Search by name of user ...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          {/*Select*/}
          <Col md={3}>
            <div>
              <Form.Select
                aria-label='Default select example'
                value={userSelected}
                onChange={(e) => setUserSelected(e.target.value)}>
                <option value='All'>--- Select a user ---</option>
                {filteredUsers?.map((u) => (
                  <option key={u?.id} value={u?.id}>
                    {u?.name}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Col>

          {/*Render*/}
          <Col md={9}>
            <Accordion defaultActiveKey={useDefaultActiveKey}>
              {filteredUsers
                ?.filter(
                  (u) =>
                    userSelected === "All" || u?.id === parseInt(userSelected)
                )
                ?.map((u) => (
                  <Accordion.Item key={u?.id} eventKey={u?.id?.toString()}>
                    <Accordion.Header>{u?.name}</Accordion.Header>
                    <Accordion.Body>
                      {filteredPosts
                        ?.filter((p) => p?.userId === u?.id)
                        ?.map((p) => (
                          <p key={p?.id}>
                            {p?.id} -{" "}
                            <Link to={`/post/${p?.id}`}>{p?.title}</Link>
                          </p>
                        ))}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
            </Accordion>
          </Col>
        </Row>
      </div>
    </>
  );
}
