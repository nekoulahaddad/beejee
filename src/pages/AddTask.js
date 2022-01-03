import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";

function AddTask() {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();

    if (username && email && text) {
      dispatch(addTask({ username, email, text }));
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
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>е-mail</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="example@gmail.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>текст задачи</Form.Label>
          <Form.Control
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            placeholder="изучать react"
          />
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
