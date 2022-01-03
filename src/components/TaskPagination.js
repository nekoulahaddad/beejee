import React from "react";
import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function TaskPagination({ page, setPage }) {
  function adjustPage(amount) {
    setPage((prevPage) => prevPage + amount);
  }
  const { numberOfPages } = useSelector((state) => state.tasks);

  return (
    <Pagination>
      {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
      {page !== 1 && (
        <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>
      )}
      {page > 2 && <Pagination.Ellipsis />}
      {page > 2 && (
        <Pagination.Item onClick={() => adjustPage(-1)}>
          {page - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{page}</Pagination.Item>
      {numberOfPages > page && (
        <Pagination.Item onClick={() => adjustPage(1)}>
          {page + 1}
        </Pagination.Item>
      )}
      {numberOfPages > page && (
        <Pagination.Next onClick={() => adjustPage(1)} />
      )}
    </Pagination>
  );
}
