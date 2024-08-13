import React from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import TodoItemModal from "./TodoItemModal"; // Import the modal component
import { todo, todoType } from "./data/todo";

export default function TodoItem() {
  const [todoOption, setTodoOption] = React.useState(todo);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("All");
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const [selectedSort, setSelectedSort] = React.useState("");

  // Lifted state for modal control
  const [showModal, setShowModal] = React.useState(false);
  const [currentTodo, setCurrentTodo] = React.useState(null);

  // Delete confirmation modal
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [todoToDelete, setTodoToDelete] = React.useState(null);

  const handleOption = (e) => {
    const value = e.target.value;
    setSelectedType(value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
    setSelectedSort(""); // Reset sort when filter changes
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSelectedSort(value);
  };

  React.useEffect(() => {
    let filteredTodos = todo;

    if (selectedType !== "All") {
      filteredTodos = filteredTodos.filter(
        (item) => item.type === parseInt(selectedType)
      );
    }

    if (searchTerm) {
      filteredTodos = filteredTodos.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSort) {
      filteredTodos = filteredTodos.sort((a, b) => {
        if (selectedSort === "titleAsc") {
          return a.title.localeCompare(b.title);
        } else if (selectedSort === "titleDesc") {
          return b.title.localeCompare(a.title);
        } else if (selectedSort === "startAsc") {
          return new Date(a.start) - new Date(b.start);
        } else if (selectedSort === "startDesc") {
          return new Date(b.start) - new Date(a.start);
        } else if (selectedSort === "endAsc") {
          return new Date(a.end) - new Date(b.end);
        } else if (selectedSort === "endDesc") {
          return new Date(b.end) - new Date(a.end);
        }
        return 0;
      });
    }

    setTodoOption(filteredTodos);
  }, [searchTerm, selectedType, selectedSort]);

  const getTodoTypeName = (typeId) => {
    const type = todoType.find((t) => t.id === typeId);
    return type ? type.name : "Unknown";
  };

  const handleEditClick = (todoItem) => {
    setCurrentTodo(todoItem);
    setShowModal(true);
  };

  const handleDeleteClick = (todoItem) => {
    setTodoToDelete(todoItem);
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    const newTodo = todoOption.filter((item) => item.id !== todoToDelete.id);
    setTodoOption(newTodo);
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className='mt-2'>
        <Row className='mb-4'>
          <Col md={{ span: 4, offset: 3 }}>
            <Form.Control
              type='text'
              aria-describedby='passwordHelpBlock'
              placeholder='Search...'
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <div>
              <Form.Select
                aria-label='Default select example'
                onChange={handleOption}>
                <option value='All'>All</option>
                {todoType.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className='mt-4'>
              <Form.Select
                aria-label='Default select example'
                onChange={handleFilterChange}>
                <option value='All'>Filter default</option>
                <option value='title'>Filter by title</option>
                <option value='start'>Filter by start date</option>
                <option value='end'>Filter by end date</option>
              </Form.Select>
            </div>
            <div className='mt-4'>
              {selectedFilter === "title" && (
                <>
                  <Form.Check
                    type='radio'
                    label='Sort by title ascending'
                    value='titleAsc'
                    checked={selectedSort === "titleAsc"}
                    onChange={handleSortChange}
                  />
                  <Form.Check
                    type='radio'
                    label='Sort by title descending'
                    value='titleDesc'
                    checked={selectedSort === "titleDesc"}
                    onChange={handleSortChange}
                  />
                </>
              )}
              {selectedFilter === "start" && (
                <>
                  <Form.Check
                    type='radio'
                    label='Sort by start date ascending'
                    value='startAsc'
                    checked={selectedSort === "startAsc"}
                    onChange={handleSortChange}
                  />
                  <Form.Check
                    type='radio'
                    label='Sort by start date descending'
                    value='startDesc'
                    checked={selectedSort === "startDesc"}
                    onChange={handleSortChange}
                  />
                </>
              )}
              {selectedFilter === "end" && (
                <>
                  <Form.Check
                    type='radio'
                    label='Sort by end date ascending'
                    value='endAsc'
                    checked={selectedSort === "endAsc"}
                    onChange={handleSortChange}
                  />
                  <Form.Check
                    type='radio'
                    label='Sort by end date descending'
                    value='endDesc'
                    checked={selectedSort === "endDesc"}
                    onChange={handleSortChange}
                  />
                </>
              )}
            </div>
          </Col>
          <Col md={9}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Title</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Partner</th> {/* Fixed duplicate 'Type' header */}
                  <th className='text-center' colSpan={2}>
                    Function
                  </th>
                </tr>
              </thead>
              <tbody>
                {todoOption.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.start}</td>
                    <td>{item.end}</td>
                    <td>{item.status ? "Done" : "Todo"}</td>
                    <td>{getTodoTypeName(item.type)}</td>
                    <td>{item.partner}</td>
                    <td className='text-center'>
                      <Button onClick={() => handleEditClick(item)}>
                        View
                      </Button>
                    </td>
                    <td className='text-center'>
                      <Button
                        variant='danger'
                        onClick={() => handleDeleteClick(item)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>

      {/* Render the modal */}
      <TodoItemModal
        show={showModal}
        onClose={() => setShowModal(false)}
        todo={currentTodo}
        setTodoOption={setTodoOption}
      />

      {/* Delete confirmation modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this todo item?</Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
