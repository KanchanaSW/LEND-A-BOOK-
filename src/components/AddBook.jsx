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
      status: "Available",
      coverPage: "",
      summary: "",
      noOfCopies: "",
      pic: "https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-2-CRC.png",
    };
    this.changeIsbnHandler = this.changeIsbnHandler.bind(this);
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
    this.changePublisherHandler = this.changePublisherHandler.bind(this);
    this.changeStatusHandler = this.changeStatusHandler.bind(this);
    this.changeCoverPageHandler = this.changeCoverPageHandler.bind(this);
    this.changeSummaryHandler = this.changeSummaryHandler.bind(this);
    this.changeNoOfCopiesHandler = this.changeNoOfCopiesHandler.bind(this);
    this.saveBook = this.saveBook.bind(this);
  }
  saveBook = (e) => {
    e.preventDefault();
    let book = {
      isbn: this.state.isbn,
      title: this.state.title,
      author: this.state.author,
      publisher: this.state.publisher,
      status: this.state.status,
      coverPage: this.state.coverPage,
      summary: this.state.summary,
      noOfCopies: this.state.noOfCopies,
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
  changeStatusHandler = (event) => {
    this.setState({ status: event.target.value });
  };
  changeCoverPageHandler = (event) => {
    this.setState({ coverPage: event.target.value });
  };
  changeSummaryHandler = (event) => {
    this.setState({ summary: event.target.value });
  };
  changeNoOfCopiesHandler = (event) => {
    this.setState({ noOfCopies: event.target.value });
  };
  uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "books_cover");

    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/kanchana123/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    this.setState({ pic: file.secure_url});
    this.setState({ coverPage: file.secure_url });
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
        <div class="container-fluid"></div>
        <form>
          <div class="card2 card-container3">
            <h3> Add Book</h3>
            <div class="row">
              <div class="col-5 col-lg-4">
                <br />
                <br />
                <img
                  src={this.state.pic}
                  class="card-img-top"
                />
                <input type="file" name="file" onChange={this.uploadImage} />
              </div>

              <div class="col-7 col-lg-8">
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
                  <input
                    type="hidden"
                    name="status"
                    className="form-control"
                    value={this.state.status}
                    onChange={this.changeStatusHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Book Copies</label>
                  <input
                    type="number"
                    placeholder="100"
                    name="noOfCopies"
                    className="form-control"
                    value={this.state.noOfCopies}
                    onChange={this.changeNoOfCopiesHandler}
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div className="form-group">
                  <input
                    type="hidden"
                    name="coverPage"
                    className="form-control"
                    value={this.state.coverPage}
                    onChange={this.changeCoverPageHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Book Summary</label>
                  <textarea
                    placeholder="Write the sumarry here"
                    name="summary"
                    className="form-control"
                    value={this.state.summary}
                    onChange={this.changeSummaryHandler}
                    rows="4"
                  ></textarea>
                </div>

                <button className="btn btn-primary" onClick={this.saveBook}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={this.cancel.bind(this)}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </div>
            </div>
            <br />
          </div>
        </form>
      </div>
    );

    
  }
}
export default AddBook;
   