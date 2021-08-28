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
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>

     
      <div className="form-group">
        <Link to={"/bookList"} className="btn btn-info">
          Books
        </Link>
      </div>
    </div>
  );
};

export default BoardAdmin;
