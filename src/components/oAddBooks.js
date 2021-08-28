/* 





//keeping only forthe validations








import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import BookService from "../services/book.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const AddBooks = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [copiesAvi, setCopiesAvi] = useState("");
  const [coverPage, setCoverPage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeIsbn = (e) => {
    const isbn = e.target.value;
    setIsbn(isbn);
  };
  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };
  const onChangeAuthor = (e) => {
    const author = e.target.value;
    setAuthor(author);
  };
  const onChangePublisher = (e) => {
    const publisher = e.target.value;
    setPublisher(publisher);
  };
  const onChangeCopiesAvi = (e) => {
    const copiesAvi = e.target.value;
    setCopiesAvi(copiesAvi);
  };
  const onChangeCoverPage = (e) => {
    const coverPage = e.target.value;
    setCoverPage(coverPage);
  };

  const handleAddBook = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      BookService.postAddBook(
        isbn,
        title,
        author,
        publisher,
        copiesAvi,
        coverPage
      ).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setTimeout(function () {
            props.history.push("/books");
            //window.location.reload(1);
          }, 3000);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleAddBook} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="isbn">ISBN</label>
                <Input
                  type="number"
                  className="form-control"
                  name="isbn"
                  value={isbn}
                  onChange={onChangeIsbn}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Book title</label>
                <Input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={onChangeTitle}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Book author</label>
                <Input
                  type="text"
                  className="form-control"
                  name="author"
                  value={author}
                  onChange={onChangeAuthor}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Book publisher</label>
                <Input
                  type="text"
                  className="form-control"
                  name="publisher"
                  value={publisher}
                  onChange={onChangePublisher}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Avilable Copies</label>
                <Input
                  type="text"
                  className="form-control"
                  name="copiesAvi"
                  value={copiesAvi}
                  onChange={onChangeCopiesAvi}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Book Cover Page</label>
                <Input
                  type="text"
                  className="form-control"
                  name="coverPage"
                  value={coverPage}
                  onChange={onChangeCoverPage}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Add Book</button>
              </div>
            </div>
          )}

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
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default AddBooks;
 */