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
            <div className="col-md-11">{/*     <h3>View Book</h3> */}</div>
            <div className="col-md-1">
              <button
                className="btn btn-danger"
                onClick={this.cancel.bind(this)}
              >
                X
              </button>
            </div>
          </div>
          <div class="row g-0" style={{ marginTop: "-12px" }}>
            <div class="col-5 col-lg-4">
              <br />
              <br />
              <img
                src={this.state.book.coverPage}
                class="img2"
                alt={this.state.book.title}
              />
            </div>
            <div class="col-7 col-lg-8">
              <div class="card-body">
                <h5 class="card-title">{this.state.book.title}</h5>
                <h6> by {this.state.book.author}</h6>
                <p class="card-text">{this.state.book.summary}</p>
                <p class="card-text">
                  {" "}
                  {this.state.book.noOfCopies} :<b> Copies</b>{" "}
                  {this.state.book.status}
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

