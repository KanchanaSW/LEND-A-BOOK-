import React, { useState, useEffect } from "react";
import BookService from "../services/book.service";

const ViewBooks = (e) => {
  const bookList = [];
  const [books, setContent] = useState(bookList);
  const [isbn, setIsbn] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    BookService.getBookList().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  const handleDelete = (isbn) => {
    setMessage("");
    setSuccessful(false);
    BookService.deleteBookDetails(isbn).then((response) => {
     setIsbn(books.filter((book) => book.isbn !== isbn));
        setTimeout(function () {
          window.location.reload(1);
        }, 3000);
         setMessage(response.data.message);
         setSuccessful(true);
      // window.location.reload();
    });
  };

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>copiesAvi</th>
            <th>coverPage</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr>
              <td>{book.isbn}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.copiesAvi}</td>
              <td>{book.coverPage}</td>
              <td>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleDelete(book.isbn)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {message && (
        <div className="form-group">
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBooks;
