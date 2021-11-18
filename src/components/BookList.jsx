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
        <br />
        <br></br>
        <div className="card">
          {this.state.books.map((book) => (            
              <div key={book.id}>
                <div class="card mb-3" style={{ maxWidth: "500px" }}>
                  <div class="row g-0">
                    <div class="col-5 col-lg-4">
                      <br />
                      <br />
                      <img
                        src={book.coverPage}
                        class="img-fluid rounded-start"
                      />
                    </div>
                    <div class="col-7 col-lg-8">
                      <div class="card-body">
                        <h5 class="card-title">{book.title}</h5>
                        <p class="card-text">{book.summary}</p>
                        {/*    <p class="card-text">
                              <small class="text-muted">
                                <ul class="list-group list-group-flush">
                                  <li class="list-group-item">{book.id}</li>
                                  <li class="list-group-item">{book.isbn}</li>
                                  <li class="list-group-item">{book.author}</li>
                                  <li class="list-group-item">
                                    {book.publisher}
                                  </li>
                                  <li class="list-group-item">{book.status}</li>
                                </ul>
                              </small>
                            </p> */}
                      </div>
                      <div class="card-body">
                        <a href="#" class="card-link">
                          Reserve
                        </a>
                        <a href="#" class="card-link">
                          Another link
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
          ))}
        </div>

        {/*   <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Status</th>
              <th>CoverPage</th>
              <th>Summary</th>
            </tr>
          </thead>

          <tbody>
            {this.state.books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.status}</td>
                <td>{book.coverPage}</td>
                <td>{book.summary}</td>

                <td>
                  <button
                    onClick={() => this.editBook(book.id)}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => this.viewBook(book.id)}
                    className="btn btn-info"
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => this.deleteBook(book.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    );
  }
}

export default BookList;
