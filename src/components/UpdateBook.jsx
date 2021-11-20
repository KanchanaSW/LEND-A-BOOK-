import React, { Component } from "react";
import BookService from "../services/book.service";

class UpdateBook extends Component {
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
     // pic: "",
    };
    this.changeIsbnHandler = this.changeIsbnHandler.bind(this);
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
    this.changePublisherHandler = this.changePublisherHandler.bind(this);
    this.changeStatusHandler = this.changeStatusHandler.bind(this);
    this.changeCoverPageHandler = this.changeCoverPageHandler.bind(this);
    this.changeSummaryHandler = this.changeSummaryHandler.bind(this);
    this.changeNoOfCopiesHandler = this.changeNoOfCopiesHandler.bind(this);
    this.updateBook = this.updateBook.bind(this);
  }

  componentDidMount() {
    BookService.viewBookDetails(this.state.id).then((res) => {
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
    });
  }

  updateBook = (e) => {
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

    BookService.putUpdateBook(book, this.state.id).then((res) => {
      this.props.history.push("/bookList");
      //  console.log("  " + JSON.stringify(res.data));
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

   // this.setState({ pic: file.secure_url });
    this.setState({ coverPage: file.secure_url });
  };

  cancel() {
    this.props.history.push("/bookList");
  }
  getFormTitle() {
    return <h3 className="text-center"> Update Book</h3>;
  }

  render() {
    return (
      <div>
        <div>
          <form>
            <div className="card" style={{ width: "800px" }}>
              <div className="row">
                <div className="col-md-11">
                  <h3> Update Book</h3>
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
                  <br />
                  <img src={this.state.coverPage} class="cover-img-card2" />
                  <input type="file" name="file" onChange={this.uploadImage} />
                </div>

                <div class="col">
                  <div className="form-group">
                    <input
                      type="hidden"
                      name="id"
                      className="form-control"
                      value={this.state.id}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group">
                        <label>ISBN</label>
                        <input
                          type="number"
                          name="isbn"
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
                    <select
                      name="status"
                      onChange={this.changeStatusHandler}
                      value={this.state.status}
                      class="form-control"
                    >
                      <option value="Available">Available</option>
                      <option value="UnAvailable">UnAvailable</option>
                    </select>
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
                  <button className="btn btn-success" style={{marginLeft:"12px"}} onClick={this.updateBook}>
                    Update
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
export default UpdateBook;
 /*       <div>
        <br />
        <br />
        <table class="table table-dark">
          <thead>
            <h4 className="text-center">View Book Details</h4>
          </thead>
          <tbody>
            <tr>
              <th class="" scope="row">
                Book ID
              </th>
              <td class="">{this.state.book.id}</td>
            </tr>
            <tr>
              <th class="" scope="row">
                Book ISBN
              </th>
              <td class="">{this.state.book.isbn}</td>
            </tr>
            <tr>
              <th class="" scope="row">
                Book Title
              </th>
              <td class="">{this.state.book.title}</td>
            </tr>
            <tr>
              <th class="" scope="row">
                Book Author
              </th>
              <td class="">{this.state.book.author}</td>
            </tr>
            <tr>
              <th class="" scope="row">
                Book Publisher
              </th>
              <td class="">{this.state.book.publisher}</td>
            </tr>
            <tr>
              <th class="" scope="row">
                Status
              </th>
              <td class="">{this.state.book.status}</td>
            </tr>
            <tr>
              <th class="" scope="row">
                Book cover Page
              </th>
              <td class="">{this.state.book.coverPage}</td>
            </tr>
            <tr>
              <th class="" scope="row">
                Book Summary
              </th>
              <td class="">{this.state.book.summary}</td>
            </tr>
          </tbody>
        </table>
      </div> */