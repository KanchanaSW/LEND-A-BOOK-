import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UserService from "../services/user.service";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
      <div className="container">
        <div
          class="card text-center"
          style={{ width: "75rem", marginLeft: "-60px" }}
        >
          <div className="row">
            <div className="col">
              <div class="card-header">User-Functions</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/userList"} className="btn btn-info">
                      Users-List
                    </Link>
                  </div>
                </li>
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/bookList"} className="btn btn-info">
                      Books-List
                    </Link>
                  </div>
                </li>
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/movieList"} className="btn btn-info">
                      Movies-List
                    </Link>
                  </div>
                </li>
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/issueList"} className="btn btn-info">
                      Issue-List
                    </Link>
                  </div>
                </li>
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/issueListALL"} className="btn btn-info">
                      Issue-List-ALL
                    </Link>
                  </div>
                </li>

                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/issueBook"} className="btn btn-info">
                      Issue Book
                    </Link>
                  </div>
                </li>
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/issueMovie"} className="btn btn-info">
                      Issue Movie
                    </Link>
                  </div>
                </li>
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/updateUser"} className="btn btn-info">
                      Update User
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            {/*  */}
            <div className="col">
              <div class="card-header">Competitors-Prices</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/scrapeBooks"} className="btn btn-primary">
                      Competitors-Books
                    </Link>
                  </div>
                </li>
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/scrapeMovies"} className="btn btn-primary">
                      Competitors-Movies
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            {/* Apis */}
            <div className="col">
              <div class="card-header">API</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/apiBooksSearch"} className="btn btn-primary">
                      API-Books
                    </Link>
                  </div>
                </li>
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/apiMoviesSearch"} className="btn btn-primary">
                      API-Movies
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col">
              <div class="card-header">CSV</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/csvBooks"} className="btn btn-primary">
                      CSV-Books
                    </Link>
                  </div>
                </li>
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/csvMovies"} className="btn btn-primary">
                      CSV-Movies
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col">
              <div class="card-header">External-DB</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/exDBBookSearch"} className="btn btn-primary">
                      External DB Books
                    </Link>
                  </div>
                </li>
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/exDBMovieSearch"} className="btn btn-primary">
                      External DB Movies
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin;
