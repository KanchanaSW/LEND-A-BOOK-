import React from "react";
import csvService from "./csvService";

class CSVBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksNew: [],
      booksExists: [],
    };
    this.addBook = this.addBook.bind(this);
    this.updateBook=this.updateBook.bind(this);
  }
  componentDidMount() {
    csvService.getCSVBooksNew().then((res) => {
      this.setState({ booksNew: res.data });
      console.log({ booksNew: res.data });
    });
    csvService.getCSVBooksExists().then((res1) => {
      this.setState({ booksExists: res1.data });
      console.log("exists books =>" + { booksExists: res1.data });
    });
  }

  addBook(id) {
     this.props.history.push(`/csvAddBook/${id}`);
  }
  updateBook(id){
      this.props.history.push(`/csvUpdateBook/${id}`);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <h3>New Books on CSV file</h3>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Cover-Image</th>
                  <th>Book-Title</th>
                  <th>Book-Author</th>
                  <th>Add</th>
                </tr>
              </thead>

              <tbody>
                {this.state.booksNew.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <img
                        src={book.coverPage}
                        style={{ width: "100px", height: "150px" }}
                      />
                    </td>
                    <td className="x" style={{ maxWidth: "300px" }}>
                      {book.title}
                    </td>
                    <td>{book.author}</td>
                    <td>
                      <button
                        class="btn btn-outline-primary btn-sm"
                        onClick={() => this.addBook(book.id)}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col">
            <h3>Existing Books on CSV file</h3>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Cover-Image</th>
                  <th>Book-Title</th>
                  <th>Book-Author</th>
                </tr>
              </thead>

              <tbody>
                {this.state.booksExists.map((bookExists) => (
                  <tr key={bookExists.id}>
                    <td>
                      <img
                        src={bookExists.coverPage}
                        style={{ width: "100px", height: "150px" }}
                      />
                    </td>
                    <td className="x" style={{ maxWidth: "300px" }}>
                      {bookExists.title}
                    </td>
                    <td>{bookExists.author}</td>
                    <td>
                      <button
                        class="btn btn-outline-primary btn-sm"
                        onClick={() => this.updateBook(bookExists.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default CSVBooks;
