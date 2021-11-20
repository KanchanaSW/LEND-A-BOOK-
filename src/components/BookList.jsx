import React from "react";
import BookService from "../services/book.service";

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
    BookService.deleteBookDetails(id).then((res) => {
      this.setState({
        books: this.state.books.filter((book) => book.id != id),
      });
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


/* 

            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Writer</th>
                  <th>Status</th>
                  <th>Image</th>
                  <th>18+</th>
                  <th>Summary</th>
                </tr>
              </thead>

              <tbody>
                {this.state.movies.map((movie) => (
                  <tr key={movie.movieId}>
                    <td>{movie.movieId}</td>
                    <td>{movie.title}</td>
                    <td>{movie.writer}</td>
                    <td>{movie.status}</td>
                    <td>{movie.image}</td>
                    <td>{movie.r18}</td>
                    <td>{movie.description}</td>

                    <td>
                      <button
                        onClick={() => this.editMovie(movie.movieId)}
                        className="btn btn-info"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.viewMovie(movie.movieId)}
                        className="btn btn-info"
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.deleteMovie(movie.movieId)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */