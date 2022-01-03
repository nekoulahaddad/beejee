import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { ReactComponent as EditIcon } from "../../components/svg/edit.svg";
import { ReactComponent as UpIcon } from "../../components/svg/up.svg";
import { ReactComponent as DownIcon } from "../../components/svg/down.svg";
import { fetchTasks, login } from "../../store/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import TaskPagination from "../../components/TaskPagination";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

function Dashboard() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("desc");
  const headers = [
    ["отредактировано", "edited"],
    ["выполнено", "done"],
    ["имя пользователя", "username"],
    ["е-mail", "email"],
    ["текст задачи", "text"],
    ["статус", "status"],
    ["Изменить", "edit"],
  ];

  const handleLogin = () => {
    dispatch(login());
  };
  useEffect(() => {
    dispatch(fetchTasks({ page, sortField, sortDirection }));
  }, [dispatch, page, sortField, sortDirection]);

  return (
    <Container className="mt-3">
      {tasks ? (
        <React.Fragment>
          <div className="button_container">
            <button
              onClick={handleLogin}
              className="color-picker-add-item addItemButton"
            >
              Логин
            </button>
          </div>
          <div className="tableContainer">
            <table id="table" className="table item-list">
              <tr>
                {headers.map((header) => (
                  <th className="table_labels">
                    {header[0] === "имя пользователя" ||
                    header[0] === "е-mail" ||
                    header[0] === "статус" ? (
                      <React.Fragment>
                        {header[1] === sortField && sortDirection === "desc" ? (
                          <React.Fragment>
                            <button
                              className="directionIcon"
                              onClick={() => {
                                setSortField(header[1]);
                                setSortDirection("asc");
                              }}
                            >
                              <UpIcon />
                            </button>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <button
                              className="directionIcon"
                              onClick={() => {
                                setSortField(header[1]);
                                setSortDirection("desc");
                              }}
                            >
                              <DownIcon />
                            </button>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    ) : null}
                    {header[0]}
                  </th>
                ))}
              </tr>
              {tasks?.map((task) => (
                <tr>
                  <th>
                    {task.status === 1 || task.status === 11 ? (
                      <div>да</div>
                    ) : (
                      <div>нет</div>
                    )}
                  </th>
                  <th>
                    {task.status === 10 || task.status === 11 ? (
                      <div>да</div>
                    ) : (
                      <div>нет</div>
                    )}
                  </th>
                  <th>{task.username}</th>
                  <th>{task.email}</th>
                  <th>{task.text}</th>
                  <th>{task.status}</th>
                  <th>
                    <button id={task.id} className="color-picker-edit-item">
                      <Link to={`/edit/${task.id}`}>
                        <EditIcon />
                      </Link>
                    </button>
                  </th>
                </tr>
              ))}
            </table>
          </div>
          <div className="button_container">
            <TaskPagination page={page} setPage={setPage} />
          </div>
          <div className="button_container">
            <Link className="color-picker-add-item addItemButton" to="/create">
              Добавить задачу
            </Link>
          </div>
        </React.Fragment>
      ) : null}
    </Container>
  );
}

export default Dashboard;
