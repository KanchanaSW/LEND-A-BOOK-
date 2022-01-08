import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";

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
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>

        <div className="form-group">
          <Link to={"/bookList"} className="btn btn-info">
            Books
          </Link>
        </div>
        <div className="form-group">
          <Link to={"/userList"} className="btn btn-info">
            Users
          </Link>
        </div>
        <div className="form-group">
          <Link to={"/movieList"} className="btn btn-info">
            Movies
          </Link>
        </div>
        <div className="form-group">
          <Link to={"/issueList"} className="btn btn-info">
            Book Issues
          </Link>
        </div>
        <div className="form-group">
          <Link to={"/issueBook"} className="btn btn-info">
            Issue Book
          </Link>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="container">
        <div className="form-group">
          <Link to={"/scrapeBooks"} className="btn btn-primary">
            Competitors-Books
          </Link>
        </div>
        <br></br>
        <div className="form-group">
          <Link to={"/scrapeMovies"} className="btn btn-primary">
            Competitors-Movies
          </Link>
        </div>

        <br></br>
        <div className="form-group">
          <Link to={"/apiBooksSearch"} className="btn btn-primary">
            API-Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin;
