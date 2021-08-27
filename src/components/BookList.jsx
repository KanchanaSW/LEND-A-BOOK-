import React from "react";
import BookService from "../services/book.service";

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.deleteBook=this.deleteBook.bind(this);
    this.viewBook=this.viewBook.bind(this);
  }

  componentDidMount() {
    BookService.getBookList().then((res) => {
      this.setState({ books: res.data });
    });
  }
  deleteBook(isbn){
       BookService.deleteBookDetails(isbn).then((res) => {
         this.setState({
           books:this.state.books.filter(
             (book)=>book.isbn !=isbn
           ),
         });        
       });
  }
  viewBook(isbn){
    this.props.history.push(`/book/${isbn}`);
   }


  render() {
    return (
      <div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>copiesAvi</th>
              <th>coverPage</th>
            </tr>
          </thead>

          <tbody>
            {this.state.books.map((book) => (
              <tr key={book.isbn}>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.copiesAvi}</td>
                <td>{book.coverPage}</td>
                <td>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => this.viewBook(book.isbn)}
                    className="btn btn-info"
                  >
                    View
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => this.deleteBook(book.isbn)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BookList;
