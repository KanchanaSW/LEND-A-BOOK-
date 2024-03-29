import React, { useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

function ApiBooksSearch() {
  const [book, setBook] = useState("");
   const [empty, setEmpty] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyAZ8bZ8yJcd_vL9vSypF-nC_NHMdtAVsfs"
  );

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          apiKey +
          "&maxResults=40"
      )
      .then((data) => {
        console.log(data.data);
         if (data.data == 0) {
           setEmpty("no records");
            setResult(data.data.items);
         } else if (data.data != 0) {
           setEmpty("");
           setResult(data.data.items);
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
              placeholder="Type Book Name..."
              type="text"
            />
          </div>
          <div className="col">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary search-btn"
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <span className="empty">{empty}</span>
          {result.map((book) => (
            <div class="card mb-3" style={{ maxWidth: "500px" }}>
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    className="img1"
                    src={
                      book.volumeInfo.imageLinks !== undefined
                        ? book.volumeInfo.imageLinks.thumbnail
                        : ""
                    }
                    alt={book.volumeInfo.title}
                  ></img>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{book.volumeInfo.title}</h5>
                    <h6 className="card-author">
                      by {book.volumeInfo.authors}
                    </h6>
                    <p className="card-text2">{book.volumeInfo.description}</p>
                    <p class="card-text">
                      <a
                        href={book.volumeInfo.previewLink}
                        className="btn btn-primary"
                      >
                        Know more
                      </a>
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

export default ApiBooksSearch;
