import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, checkAuthentication } from "../store/taskSlice";

function Login() {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { error, loggedIn } = useSelector((state) => state.tasks);

  let navigate = useNavigate();

  const handleAddTask = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
    if (loggedIn) {
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(checkAuthentication());
    if (loggedIn) {
      navigate("/");
    }
  });

  return (
    <Container className="mt-3">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            type="text"
          />
          {error && error.username && (
            <Form.Text className="text-muted">{error.username}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          {error && error.password && (
            <Form.Text className="text-muted">{error.password}</Form.Text>
          )}
        </Form.Group>
        <Button onClick={handleAddTask} variant="primary" type="submit">
          Логин
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

export default Login;
