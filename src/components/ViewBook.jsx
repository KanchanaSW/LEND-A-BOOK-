import React, { Component } from "react";
import BookService from "../services/book.service";
import IssueService from "../services/issueService";
import ReserveService from "../services/reserve.service";

class ViewBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      book: {},
    };
    this.saveReserve = this.saveReserve.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  componentDidMount() {
    BookService.viewBookDetails(this.state.id).then((res) => {
      this.setState({ book: res.data });
    });
  }
  saveReserve = (e) => {
    e.preventDefault();
    let reserveTemp = {
      bookId: this.state.id,
    };
    console.log("temp Reserve=>" + JSON.stringify(reserveTemp));

    ReserveService.postReserve(reserveTemp).then((res) => {
      this.props.history.push("/bookList");
    });
  };
  cancel() {
    this.props.history.push("/bookList");
  }

  render() {
    return (
      <div>
        <div class="card mb-3" style={{ maxWidth: "800px" }}>
          <div className="row">
            <div className="col-md-11">
              <h3>View Book</h3>
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
          <div class="row g-0">
            <div class="col-5 col-lg-4">
              <br />
              <br />
              <img
                src={this.state.book.coverPage}
                class="img-fluid rounded-start"
              />
            </div>
            <div class="col-7 col-lg-8">
              <div class="card-body">
                <h5 class="card-title">{this.state.book.title}</h5>
                <p class="card-text">{this.state.book.summary}</p>
                <p class="card-text">
                  <small class="text-muted">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{this.state.book.id}</li>
                      <li class="list-group-item">{this.state.book.isbn}</li>
                      <li class="list-group-item">{this.state.book.author}</li>
                      <li class="list-group-item">
                        {this.state.book.publisher}
                      </li>
                      <li class="list-group-item">{this.state.book.status}</li>
                      <li class="list-group-item">
                        {this.state.book.noOfCopies}
                      </li>
                    </ul>
                  </small>
                </p>
              </div>
              <div class="card-body">
                <button
                  class="btn btn-outline-primary btn-sm"
                  onClick={this.saveReserve}
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewBook;

/*  <table className="table table-striped table-bordered">
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
        </table> */
