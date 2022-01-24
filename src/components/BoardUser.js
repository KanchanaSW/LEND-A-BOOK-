import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
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
        <div class="card text-center" style={{ width: "30rem" }}>
          <div className="row">
            <div className="col">
              <div class="card-header">Content</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/movieList"} className="btn btn-info">
                      Movies-List
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
               
              </ul>
            </div>
            {/*  */}
            <div className="col">
              <div class="card-header">Functions</div>
              <ul class="list-group list-group-flush">
               
                <li class="list-group-item">
                  <div className="form-group">
                    <Link to={"/issueList"} className="btn btn-info">
                      Issue-List
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
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default BoardUser;
