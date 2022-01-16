import React from "react";
import csvService from "./csvService";
import BookService from "../../services/book.service";
import Swal from "sweetalert2";

class CSVAddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      isbn: "",
      title: "",
      author: "",
      publisher: "",
      status: "",
      coverPage: "",
      summary: "",
      noOfCopies: "",
      errors: [],
    };
    // this.handleInputChange = this.handleInputChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.state.id);
    csvService.getCSVBookById(this.state.id).then((res) => {
      let book = res.data;
      this.setState({
        isbn: book.isbn,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        status: book.status,
        coverPage: book.coverPage,
        summary: book.summary,
        noOfCopies: book.noOfCopies,
      });
      console.log(book);
    });
  }
  handleSubmit(e) {
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
     csvService.postCSVAddBook(book)
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
  }

  render() {
    return (
      <div>
        <div>
          <form>
            <div className="card" style={{ width: "800px" }}>
              <div className="row">
                <div className="col-md-11">
                  <h3>Add CSV Book to DB</h3>
                </div>
                <div className="col-md-1">
                  <button
                    className="btn btn-danger"
                  //  onClick={this.cancel.bind(this)}
                  >
                    X
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4" style={{ marginRight: "2%" }}>
                  <br />
                  <br />
                  <img src={this.state.coverPage} class="cover-img-card2" />
                </div>

                <div class="col">
                  <div className="form-group">
                    <input
                      type="hidden"
                      name="id"
                      className="form-control"
                      disabled
                      value={this.state.id}
                    />
                  </div>
                  <div className="row">
                    <div className="form-group">
                      <label>ISBN</label>
                      <input
                        type="text"
                        name="isbn"
                        className="form-control"
                        disabled
                        value={this.state.isbn}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Book Title</label>
                    <input
                      name="title"
                      className="form-control"
                      required
                      value={this.state.title}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Author</label>
                    <input
                      name="author"
                      className="form-control"
                      value={this.state.author}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Publisher</label>
                    <input
                      name="publisher"
                      className="form-control"
                      value={this.state.publisher}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <input
                      name="status"
                      className="form-control"
                      value={this.state.status}
                      disabled
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
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Summary</label>
                    <textarea
                      name="summary"
                      value={this.state.summary}
                      disabled
                      className="form-control"
                      maxLength={225}
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10"></div>
                <div className="col-md-2">
                  <button
                    className="btn btn-success"
                    style={{ marginTop: "10px" }}
                    onClick={this.handleSubmit}
                  >
                    Add Book
                  </button>
                </div>
              </div>
              <br />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CSVAddBook;
