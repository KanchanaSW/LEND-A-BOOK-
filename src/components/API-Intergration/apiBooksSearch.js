import React, { useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

function ApiBooksSearch() {
  const [book, setBook] = useState("");
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
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="card-header main-search">
        {/* 
            <form:form action="${pageContext.request.contextPath}/SearchItem" method="GET">
            <div class="row">
                <div class="col-10">
                    <input type="text" placeholder="Type Item Name.." class="form-control" name="searchItem">
                </div>
                <div class="col">
                    <button class="btn btn-primary search-btn" type="submit">Search</button>
                    <button href="/ViewAllItems">Item-List</button>
                </div>
            </div>
        </form:form> */}
        <div className="row">
          <div className="col-12 col-md-3 col-xl-4">
            <input
              onChange={handleChange}
              className="AutoFocus form-control"
              placeholder="Type something..."
              type="text"
            />
          </div>
          <div className="col-sm align-self-end">
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
          {result.map((book) => (
            <div class="card mb-3" style={{ maxWidth: "540px" }}>
              <div class="row g-0">
                <div class="col-md-4">
                  <img
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
