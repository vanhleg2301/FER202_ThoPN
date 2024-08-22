import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

export default function Index() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radius, setRadius] = useState("all");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("http://localhost:9999/user");
      const userData = response?.data;
      setUsers(userData);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await axios.get("http://localhost:9999/todo");
      const todoData = response?.data;

      const todosWithUsernames = todoData.map((todo) => {
        const user = users.find((u) => u.id == todo.userId);
        return {
          ...todo,
          username: user ? user.name : "Unknown User",
        };
      });

      let filteredTodos = todosWithUsernames;

      // Filter by selected users
      if (checked.length > 0) {
        filteredTodos = filteredTodos.filter((todo) =>
          checked.includes(JSON.stringify(todo.userId))
        );
      }

      // Filter by completion status
      if (radius !== "all") {
        filteredTodos = filteredTodos.filter((todo) =>
          radius === "finish" ? todo.completed : !todo.completed
        );
      }

      setTodos(filteredTodos);
    };
    fetchTodo();
  }, [users, checked, radius]);

  const handleFilterChecked = (event, user) => {
    const userId = user?.id;
    if (checked.includes(userId)) {
      setChecked(checked.filter((id) => id !== userId));
    } else {
      setChecked([...checked, userId]);
    }
  };

  const handleRadius = (e) => {
    setRadius(e.target.value);
  };

  const handleChange = async (todoId) => {
    try {
      const todo = todos.find((t) => t.id === todoId);
      const updatedStatus = !todo.completed;

      await axios.patch(`http://localhost:9999/todo/${todoId}`, {
        completed: updatedStatus,
      });

      // Update the local state with the new completion status
      const updatedTodos = todos.map((t) =>
        t.id === todoId ? { ...t, completed: updatedStatus } : t
      );

      setTodos(updatedTodos);
      alert("Change success.");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={9}>
            <h1 className='text-center'>Todo List</h1>
            <Table bordered>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Title</th>
                  <th>User</th>
                  <th>Completed</th>
                  <th>Change status</th>
                </tr>
              </thead>
              <tbody>
                {todos?.map((todo, index) => (
                  <tr key={todo?.id}>
                    <td>{index + 1}</td>
                    <td>{todo?.title}</td>
                    <td>{todo?.username}</td>
                    <td>
                      {todo?.completed ? (
                        <span style={{ color: "blue" }}>Finish</span>
                      ) : (
                        <span style={{ color: "red" }}>Unfinish</span>
                      )}
                    </td>
                    <td>
                      <Button
                        variant='primary'
                        onClick={() => handleChange(todo?.id)}>
                        Change
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={3}>
            <div>
              <div>
                <h2>Users</h2>
                {users?.map((user) => (
                  <div key={user?.id}>
                    <input
                      type='checkbox'
                      onChange={(e) => handleFilterChecked(e, user)}
                      checked={checked.includes(user?.id)}
                    />
                    <span className='ml-4'>{user?.name}</span>
                  </div>
                ))}
              </div>
              <div>
                <h2>Completed</h2>
                <label>
                  <input
                    type='radio'
                    name='type'
                    value='finish'
                    checked={radius === "finish"}
                    onChange={handleRadius}
                  />
                  Finished
                </label>
                <br />
                <label>
                  <input
                    type='radio'
                    name='type'
                    value='unfinish'
                    checked={radius === "unfinish"}
                    onChange={handleRadius}
                  />
                  Unfinish
                </label>
                <br />
                <label>
                  <input
                    type='radio'
                    name='type'
                    value='all'
                    checked={radius === "all"}
                    onChange={handleRadius}
                  />
                  All
                </label>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
