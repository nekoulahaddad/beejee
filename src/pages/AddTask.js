import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/taskSlice";

function AddTask() {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const { error } = useSelector((state) => state.tasks);

  const handleAddTask = (e) => {
    e.preventDefault();
    dispatch(addTask({ username, email, text }));
    if (!error) {
      setUserName("");
      setEmail("");
      setText("");
    }
  };

  return (
    <Container className="mt-3">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>имя пользователя</Form.Label>
          <Form.Control
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            type="text"
            placeholder="John Doe"
          />
          {error && error.username && (
            <Form.Text className="text-muted">{error.username}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>е-mail</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="example@gmail.com"
          />
          {error && error.email && (
            <Form.Text className="text-muted">{error.email}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>текст задачи</Form.Label>
          <Form.Control
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            placeholder="изучать react"
          />
          {error && error.text && (
            <Form.Text className="text-muted">{error.text}</Form.Text>
          )}
        </Form.Group>
        <Button onClick={handleAddTask} variant="primary" type="submit">
          Добавить
        </Button>{" "}
        <Button variant="secondary" type="submit">
          <Link className="link" to="/">
            Вернуться к главной странице
          </Link>
        </Button>
      </Form>
    </Container>
  );
}

export default AddTask;
