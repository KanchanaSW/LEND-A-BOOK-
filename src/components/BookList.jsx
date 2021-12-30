import React from "react";
import BookService from "../services/book.service";
import Swal from "sweetalert2";

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.addBook = this.addBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.viewBook = this.viewBook.bind(this);
  }
  componentDidMount() {
    BookService.getBookList().then((res) => {
      this.setState({ books: res.data });
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
          BookService.deleteBookDetails(id).then((res) => {
            this.setState({
              books: this.state.books.filter((book) => book.id != id),
            });
          }).catch((error)=>{
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
          })
       }
     });   
  
  }
  viewBook(id) {
    this.props.history.push(`/book/${id}`);
  }
  render() {
    return (
      <div>
        <div className="btn btn-primary" onClick={this.addBook}>
          Add New Book
        </div>
        <div className="row">
          {this.state.books.map((book) => (
            <div className="col-md-3" key={book.id}>
              <div className="card bwm-card">
                <img src={book.coverPage} className="cover-img-card" />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text2">{book.summary}....</p>
                </div>
                <table>
                  <button
                    style={{ marginRight: "14px",marginLeft:"10px" }}
                    class="btn btn-outline-success btn-sm"
                    onClick={() => this.viewBook(book.id)}
                  >
                    Read More
                  </button>
                  <button
                    style={{ marginRight: "14px" }}
                    class="btn btn-outline-primary btn-sm"
                    onClick={() => this.editBook(book.id)}
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    onClick={() => this.deleteBook(book.id)}
                  >
                    X
                  </button>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default BookList;