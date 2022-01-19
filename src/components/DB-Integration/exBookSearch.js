import React, { useState } from "react";
import axios from "axios";
import externalServices from "./external.services";

function ExBookSearch(){
      const [book, setBook] = useState("");
      const [result, setResult] = useState([]);

      function handleChange(event){
          const book=event.target.value;
          setBook(book);
      }
      function handleSubmit(event){
          event.preventDefault();
            externalServices.searchBook(book).then((data)=>{
                console.log(data.data);
                setResult(data.data);
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
                      ></img>
                    </div>
                    <div class="col md-8">
                      <div class="card-body">
                        <h5 class="card-title">{book.title}</h5>
                        <h6 className="card-author">by {book.author}</h6>
                        <p className="card-text2">{book.summary}...</p>
                        <p class="card-text">
                          {/*     <a
                            href={book.volumeInfo.previewLink}
                            className="btn btn-primary"
                          >
                            Know more
                          </a> */}
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