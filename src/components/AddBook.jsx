import React, { Component } from "react";
import BookService from "../services/book.service";
import Swal from "sweetalert2";  

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
      noOfCopies: "1",
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
    //console.log("book=>" + JSON.stringify(book));

    BookService.postAddBook(book)
      .then((res) => {
        console.log(res.data);
        if (res.data === "success") {
           Swal.fire({
             title: "Added Success!",
             text: "Check the Book List!",
             type: "success",
             icon: "success",
           }).then(this.props.history.push("/bookList"));          
        } else {
          console.log(res.statusText);
        }
      })
      .catch((error) => {
        if (error.response.data === "existsTitle") {
          Swal.fire({
            title: "Book already exists with the same Title",
            text: "Added Failed!",
            type: "error",
            icon: "warning",
          }).then(function () {
            console.log("Error : Book already exists with the same Title");
          });
        } else if (error.response.data === "existsIsbn") {
           Swal.fire({
             title: "Book already exists with the same ISBN",
             text: "Added Failed!",
             type: "error",
             icon: "warning",
           }).then(function () {
             console.log("Error : Book already exists with the same isbn");
           });
        } else {
            Swal.fire({
              title: "Network error",
              text: "Added Failed!",
              type: "error",
              icon: "warning",
            }).then(function () {
              console.log("Exception error");
            });
        }
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

    this.setState({ pic: file.secure_url });
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
        <form>
          <div class="card" style={{ width: "800px" }}>
            <div className="row">
              <div className="col-md-11">
                <h3> Add Book</h3>
              </div>
              <div className="col-md-1">
                <button
                  className="btn btn-danger"
                  onClick={this.cancel.bind(this)}
                >
                  X
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4" style={{ marginRight: "2%" }}>
                <br />

                <img src={this.state.pic} class="cover-img-card2" />
                <input type="file" name="file" onChange={this.uploadImage} />
              </div>

              <div class="col">
                <div className="row">
                  <div className="col-md-9">
                    <div className="form-group">
                      <label>ISBN</label>
                      <input
                        type="number"
                        placeholder="ISBN"
                        name="isbn"
                        required
                        className="form-control"
                        value={this.state.isbn}
                        onChange={this.changeIsbnHandler}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Copies</label>
                      <input
                        type="number"
                        name="noOfCopies"
                        min="1"
                        className="form-control"
                        value={this.state.noOfCopies}
                        onChange={this.changeNoOfCopiesHandler}
                      />
                    </div>
                  </div>
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
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
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
              </div>
            </div>
            <div className="row">
              <div className="col-md-10"></div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "32px" }}
                  onClick={this.saveBook}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default AddBook;

