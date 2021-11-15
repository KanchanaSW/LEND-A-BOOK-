import React, { Component } from 'react';
import BookService from '../services/book.service';

class UpdateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      isbn:"",
      title: "",
      author: "",
      publisher: "",
      status: "",
      coverPage: "",
      summary:"",
      noOfCopies:"",
    };
    this.changeIsbnHandler = this.changeIsbnHandler.bind(this);
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
    this.changePublisherHandler = this.changePublisherHandler.bind(this);
    this.changeStatusHandler = this.changeStatusHandler.bind(this);
    this.changeCoverPageHandler = this.changeCoverPageHandler.bind(this);
    this.changeSummaryHandler=this.changeSummaryHandler.bind(this);
    this.changeNoOfCopiesHandler = this.changeNoOfCopiesHandler.bind(this);
    this.updateBook = this.updateBook.bind(this);
  }

componentDidMount(){
    BookService.viewBookDetails(this.state.id).then((res)=>{
        let book=res.data;
        this.setState({
          isbn:book.isbn,
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          status: book.status,
          coverPage: book.coverPage,
          summary:book.summary,
          noOfCopies:book.noOfCopies,
        });
    })
}

  updateBook = (e) => {
    e.preventDefault();
    let book = {
        isbn:this.state.isbn,
      title: this.state.title,
      author: this.state.author,
      publisher: this.state.publisher,
      status: this.state.status,
      coverPage: this.state.coverPage,
      summary:this.state.summary,
      noOfCopies:this.state.noOfCopies,
    };
    console.log("book=>" + JSON.stringify(book));

    BookService.putUpdateBook(book,this.state.id).then(res=>{
        this.props.history.push("/bookList");
        console.log("  "+JSON.stringify(res.data));
    })
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
  changeSummaryHandler=(event)=>{
    this.setState({ summary: event.target.value});
  };
  changeNoOfCopiesHandler=(event)=>{
    this.setState({noOfCopies:event.target.value});
  }

  cancel() {
    this.props.history.push("/bookList");
  }
  getFormTitle() {
    return <h3 className="text-center"> Update Book</h3>;
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getFormTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <input
                      type="hidden"
                      name="id"
                      className="form-control"
                      value={this.state.id}
                    />
                  </div>
                  <div className="form-group">
                    <label>ISBN</label>
                    <input
                      type="number"
                      name="isbn"
                      readOnly="readonly"
                      className="form-control"
                      value={this.state.isbn}
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Title</label>
                    <input
                      name="title"
                      className="form-control"
                      value={this.state.title}
                      onChange={this.changeTitleHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Author</label>
                    <input
                      name="author"
                      className="form-control"
                      value={this.state.author}
                      onChange={this.changeAuthorHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Publisher</label>
                    <input
                      name="publisher"
                      className="form-control"
                      value={this.state.publisher}
                      onChange={this.changePublisherHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <input
                      type="text"
                      name="status"
                      className="form-control"
                      value={this.state.status}
                      onChange={this.changeStatusHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Cover Page</label>
                    <input
                      name="coverPage"
                      className="form-control"
                      value={this.state.coverPage}
                      onChange={this.changeCoverPageHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Summary</label>
                    <input
                      name="summary"
                      className="form-control"
                      value={this.state.summary}
                      onChange={this.changeSummaryHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Copies</label>
                    <input
                      type="number"
                      name="noOfCopies"
                      className="form-control"
                      value={this.state.noOfCopies}
                      onChange={this.changeNoOfCopiesHandler}
                    />
                  </div>

                  <button className="btn btn-success" onClick={this.updateBook}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UpdateBook;