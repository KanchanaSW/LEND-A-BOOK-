import React, { Component } from "react";
import BookService from "../services/book.service";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isbn: "",
      title: "",
      author: "",
      publisher: "",
      copiesAvi: "",
      coverPage: "",
    };
    this.changeIsbnHandler = this.changeIsbnHandler.bind(this);
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
    this.changePublisherHandler = this.changePublisherHandler.bind(this);
    this.changeCopiesAviHandler = this.changeCopiesAviHandler.bind(this);
    this.changeCoverPageHandler = this.changeCoverPageHandler.bind(this);
    this.saveBook = this.saveBook.bind(this);
  }
  saveBook = (e) => {
    e.preventDefault();
    let book = {
      isbn: this.state.isbn,
      title: this.state.title,
      author: this.state.author,
      publisher: this.state.publisher,
      copiesAvi: this.state.copiesAvi,
      coverPage: this.state.coverPage,
    };
    console.log("book=>" + JSON.stringify(book));

    BookService.postAddBook(book).then((res) => {
      this.props.history.push("/bookList");
    });
  };

  changeIsbnHandler = (event) => {
    this.setState({ isbn: event.target.value });
  };
  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };
  changeAuthorHandler = (event) => {
    this.setState({ author: event.target.value });
  };
  changePublisherHandler = (event) => {
    this.setState({ publisher: event.target.value });
  };
  changeCopiesAviHandler = (event) => {
    this.setState({ copiesAvi: event.target.value });
  };
  changeCoverPageHandler = (event) => {
    this.setState({ coverPage: event.target.value });
  };

  cancel() {
    this.props.history.push("/bookList");
  }
  getFormTitle() {
    return <h3 className="text-center"> Add Book</h3>;
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getFormTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>ISBN</label>
                    <input
                      type="number"
                      placeholder="ISBN"
                      name="isbn"
                      className="form-control"
                      value={this.state.isbn}
                      onChange={this.changeIsbnHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Title</label>
                    <input
                      placeholder="Book Title"
                      name="title"
                      required
                      className="form-control"
                      value={this.state.title}
                      onChange={this.changeTitleHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Author</label>
                    <input
                      placeholder="Book Author"
                      name="author"
                      className="form-control"
                      value={this.state.author}
                      onChange={this.changeAuthorHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Publisher</label>
                    <input
                      placeholder="Book Publisher"
                      name="publisher"
                      className="form-control"
                      value={this.state.publisher}
                      onChange={this.changePublisherHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Copies Avilable</label>
                    <input
                      placeholder="Book Copies Avilable"
                      name="copiesAvi"
                      className="form-control"
                      value={this.state.copiesAvi}
                      onChange={this.changeCopiesAviHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Cover Page</label>
                    <input
                      placeholder="Book Cover Page"
                      name="coverPage"
                      className="form-control"
                      value={this.state.coverPage}
                      onChange={this.changeCoverPageHandler}
                    />
                  </div>

                  <button className="btn btn-success" onClick={this.saveBook}>
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddBook;
