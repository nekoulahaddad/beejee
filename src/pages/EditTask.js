import React, { useState, useEffect, useRef } from "react";
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
  const prevTextValue = useRef("");
  let { id } = useParams();
  const { error, tasks } = useSelector((state) => state.tasks);
  let selectedTask = tasks.filter((task) => task.id == id);
  selectedTask = selectedTask[0];

  const handleEditTask = (e) => {
    e.preventDefault();
    let newStatus = status;
    if (prevTextValue.current !== "" && status === 0) {
      newStatus = 1;
      setStatus(1);
    }
    if (prevTextValue.current !== "" && status === 10) {
      newStatus = 11;
      setStatus(11);
    }
    dispatch(editTask({ id, text, newStatus }));
  };

  useEffect(() => {
    if (selectedTask) {
      setStatus(selectedTask.status);
      setText(selectedTask.text);
    }
  }, [selectedTask]);

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
              onChange={(e) => {
                prevTextValue.current = text;
                setText(e.target.value);
              }}
              defaultValue={text}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>статус задачи</Form.Label>
            <Form.Select
              onChange={(e) => setStatus(e.target.value)}
              defaultValue={status}
              type="text"
              aria-label="Default select example"
            >
              <option value="0" selected={status === 0 && "selected"}>
                0
              </option>
              <option value="1" selected={status === 1 && "selected"}>
                1
              </option>
              <option value="10" selected={status === 10 && "selected"}>
                10
              </option>
              <option value="11" selected={status === 11 && "selected"}>
                11
              </option>
            </Form.Select>
            {error && error.token && (
              <Form.Text className="text-muted">{error.token}</Form.Text>
            )}
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
