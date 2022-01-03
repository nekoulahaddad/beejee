import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../store/taskSlice";

function EditTask() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [text, setText] = useState("");
  let { id } = useParams();
  const { tasks } = useSelector((state) => state.tasks);
  let selectedTask = tasks.filter((task) => task.id == id);
  selectedTask = selectedTask[0];

  const handleEditTask = (e) => {
    e.preventDefault();
    if (status && text) {
      dispatch(editTask({ id, text, status }));
    }
  };

  useEffect(() => {
    if (selectedTask) {
      setStatus(selectedTask.status);
      setText(selectedTask.text);
    }
  }, [selectedTask]);
  return (
    <Container className="mt-3">
      {selectedTask ? (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>текст задачи</Form.Label>
            <Form.Control
              onChange={(e) => setText(e.target.value)}
              defaultValue={text}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>статус задачи</Form.Label>
            <Form.Control
              onChange={(e) => setStatus(e.target.value)}
              defaultValue={status}
              type="text"
            />
          </Form.Group>
          <Button onClick={handleEditTask} variant="primary" type="submit">
            Редактировать
          </Button>{" "}
          <Button variant="secondary" type="submit">
            <Link className="link" to="/">
              Вернуться к главной странице
            </Link>
          </Button>
        </Form>
      ) : null}
    </Container>
  );
}

export default EditTask;
