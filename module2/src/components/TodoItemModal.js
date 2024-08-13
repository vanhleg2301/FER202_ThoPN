import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { todoType } from "./data/todo";

export default function TodoItemModal({ show, onClose, todo, setTodoOption }) {
  const [currentTodo, setCurrentTodo] = React.useState(todo);
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    setCurrentTodo(todo);
  }, [todo]);

  const handleSaveChanges = () => {
    setTodoOption((prevTodos) =>
      prevTodos.map((t) => (t.id === currentTodo.id ? currentTodo : t))
    );
    setIsEditing(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Todo Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentTodo && (
          <Form>
            <Form.Group controlId='formTitle'>
              <Form.Label>Title</Form.Label>
              {isEditing ? (
                <Form.Control
                  type='text'
                  placeholder='Enter title'
                  value={currentTodo.title}
                  onChange={(e) =>
                    setCurrentTodo({ ...currentTodo, title: e.target.value })
                  }
                />
              ) : (
                <p>{currentTodo.title}</p>
              )}
            </Form.Group>
            <Form.Group controlId='formStart' className='mt-3'>
              <Form.Label>Start Date</Form.Label>
              {isEditing ? (
                <Form.Control
                  type='date'
                  value={currentTodo.start}
                  onChange={(e) =>
                    setCurrentTodo({ ...currentTodo, start: e.target.value })
                  }
                />
              ) : (
                <p>{currentTodo.start}</p>
              )}
            </Form.Group>
            <Form.Group controlId='formEnd' className='mt-3'>
              <Form.Label>End Date</Form.Label>
              {isEditing ? (
                <Form.Control
                  type='date'
                  value={currentTodo.end}
                  onChange={(e) =>
                    setCurrentTodo({ ...currentTodo, end: e.target.value })
                  }
                />
              ) : (
                <p>{currentTodo.end}</p>
              )}
            </Form.Group>
            <Form.Group controlId='formStatus' className='mt-3'>
              <Form.Label>Status</Form.Label>
              {isEditing ? (
                <Form.Select
                  value={''}
                  onChange={(e) =>
                    setCurrentTodo({
                      ...currentTodo,
                      status: e.target.value,
                    })
                  }>
                  <option value=''>--- Select status ---</option>
                  <option value='todo'>Todo</option>
                  <option value='done'>Done</option>
                </Form.Select>
              ) : (
                <p>{currentTodo.status ? "Done" : "Todo"}</p>
              )}
            </Form.Group>
            <Form.Group controlId='formType' className='mt-3'>
              <Form.Label>Type</Form.Label>
              {isEditing ? (
                <Form.Select
                  value={currentTodo.type}
                  onChange={(e) =>
                    setCurrentTodo({
                      ...currentTodo,
                      type: parseInt(e.target.value),
                    })
                  }>
                  {todoType.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <p>{todoType.find((t) => t.id === currentTodo.type)?.name}</p>
              )}
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isEditing ? (
          <>
            <Button variant='secondary' onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant='primary' onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </>
        ) : (
          <Button variant='primary' onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
