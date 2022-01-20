import React, { useState } from "react";
import Swal from "sweetalert2";
import externalServices from "./external.services";
import { useHistory } from "react-router-dom";

function ExBookSearch() {
  const history = useHistory();
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [bookId, setBookId] = useState("");

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }
  function handleSubmit(event) {
    event.preventDefault();

    externalServices.searchBook(book).then((data) => {
      console.log(data.data);
      setResult(data.data);
    });
  }
  function handleAddBook(event) {
    const bookId = event.target.value;
    setBookId(bookId);
    var id = Number(bookId);
    console.log("book id ");
    console.log(id);
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to add the Book to System Database?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        externalServices
          .addEXBook(id)
          .then((res) => {
            console.log(res.data);
            if (res.data === "success") {
              Swal.fire({
                title: "Added Success!",
                text: "Check the Book List!",
                type: "success",
                icon: "success",
              }).then(history.push("/bookList"));
            } else {
              console.log(res.statusText);
            }
          })
          .catch((error) => {
            if (error.response.data === "existsIsbn") {
              Swal.fire({
                title: "Book already exists with the same ISBN",
                text: "Added Failed!",
                type: "error",
                icon: "warning",
              }).then(function () {
                console.log("Error : Book already exists with the same isbn");
              });
            } else if (error.response.data === "dontExists") {
              Swal.fire({
                title: "Book dont exists with the same Id",
                text: "Added Failed!",
                type: "error",
                icon: "warning",
              }).then(function () {
                console.log("Error : Book already exists with the same id");
              });
            } else {
              Swal.fire({
                title: "Network error",
                text: "Added Failed!",
                type: "error",
                icon: "warning",
              }).then(function () {
                console.log("Exception error");
              });
            }
          });
      }
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="card-header main-search">
        <div className="row">
          <div className="col-10">
            <input
              onChange={handleChange}
              className="AutoFocus form-control"
              placeholder="Type book title..."
              type="text"
            />
          </div>
          <div className="col">
            <input
              type="submit"
              value="🔍 Search"
              className="btn btn-primary search-btn"
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {result.map((book) => (
            <div class="card mb-3" style={{ maxWidth: "500px" }}>
              <div class="row g-0">
                <div class="col md-4">
                  <img
                    src={book.coverPage !== undefined ? book.coverPage : ""}
                    alt={book.title}                   
                    className="img1"
                  ></img>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{book.title}</h5>
                    <h6 className="card-author">by {book.author}</h6>
                    <p className="card-text2">{book.summary}...</p>
                    <p class="card-text">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={handleAddBook}
                        value={book.id}
                      >
                        Add
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
export default ExBookSearch;
