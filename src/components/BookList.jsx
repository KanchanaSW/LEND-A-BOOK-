import React from "react";
import BookService from "../services/book.service";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      name: "",
      empty: "",
      books: [],
    };
    this.addBook = this.addBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.viewBook = this.viewBook.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    BookService.getBookList().then((res) => {
      this.setState({ books: res.data });
    });
  }

  handleChange(event) {
    var value = event.target.value;
    this.setState({ name: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    var v = "ALL";
    var z = "";
    if (this.state.name == "") {
      z = v;
      console.log(z);
    } else {
      z = this.state.name;
      console.log(z);
    }
    BookService.searchBook(z).then((data) => {
      console.log(data.data);
      if (data.data == 0) {
        var x = "no books found";
        this.setState({ empty: x });
        this.setState({ books: data.data });
        console.log(this.state.empty);
      } else if (data.data != 0) {
        this.setState({ empty: "" });
        this.setState({ books: data.data });
      }
    });
  }

  addBook() {
    this.props.history.push(`/addBook`);
  }
  editBook(id) {
    this.props.history.push(`/updateBook/${id}`);
  }
  deleteBook(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        BookService.deleteBookDetails(id)
          .then((res) => {
            this.setState({
              books: this.state.books.filter((book) => book.id != id),
            });
          })
          .catch((error) => {
            if (error.response.data === "dontExists") {
              Swal.fire({
                title: "Cannot find the book",
                text: "Delete Failed!",
                type: "error",
                icon: "warning",
              }).then(function () {
                console.log("Error : Cannot find the book");
              });
            } else {
              Swal.fire({
                title: "Book has issued",
                text: "Delete Failed!",
                type: "error",
                icon: "warning",
              }).then(function () {
                console.log("Exception error");
              });
            }
          });
      }
    });
  }
  viewBook(id) {
    this.props.history.push(`/book/${id}`);
  }
  showEditdelete(id) {
    const user = AuthService.getCurrentUser();
    //console.log(user.roles);
    //this.setState({ user: user.roles });
    if (user.roles == "ROLE_ADMIN") {
      console.log("admin" + id);
      return (
        <div>
          <button
            style={{ marginRight: "8px" }}
            class="btn btn-outline-primary btn-sm"
            onClick={() => this.editBook(id)}
          >
            Edit
          </button>
          <button
            style={{ marginRight: "auto" }}
            class="btn btn-outline-danger btn-sm"
            onClick={() => this.deleteBook(id)}
          >
            X
          </button>
        </div>
      );
    } else {
      //console.log("user" + id);
    }
  }
  showAddBtn() {
    const user = AuthService.getCurrentUser();
    console.log(user.roles);
    //this.setState({ user: user.roles });
    if (user.roles == "ROLE_ADMIN") {
      return (
        <div className="btn btn-primary" onClick={this.addBook}>
          Add New Book
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.showAddBtn()}
        <form onSubmit={this.handleSubmit}>
          <div className="card-header main-search">
            <div className="row">
              <div className="col-10">
                <input
                  onChange={this.handleChange}
                  value={this.state.name}
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

          <div className="row">
            {this.state.books.map((book) => (
              <div class="card mb-3" style={{ maxWidth: "500px" }}>
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      src={book.coverPage}
                      className="img1"
                      alt={book.title}
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text2">{book.summary}....</p>
                      <p class="card-text">
                        <table style={{ display: "flex" }}>
                          {this.showEditdelete(book.id)}

                          <button
                            class="btn btn-link"
                            onClick={() => this.viewBook(book.id)}
                          >
                            Read More
                          </button>
                        </table>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <span className="empty">{this.state.empty}</span>
          </div>
        </form>
      </div>
    );
  }
}
export default BookList;
