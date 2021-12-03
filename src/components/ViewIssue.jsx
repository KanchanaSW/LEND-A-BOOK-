import React, { Component } from "react";
import IssueService from "../services/issueService";

class ViewIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueId: this.props.match.params.issueId,
      issuedBooks: [],
      issuedBooksR:[],
    };
  }
  componentDidMount() {
    IssueService.getViewMyIssuedBooksListNR(this.state.issueId).then((res) => {
      this.setState({ issuedBooks: res.data });console.log({ issuedBooks: res.data });
    });
    IssueService.getViewMyIssuedBooksListR(this.state.issueId).then((res)=>{
        this.setState({ issuedBooksR: res.data});console.log({ issuedBooksR: res.data });
    });
  }
  render() {
    return (
      <div>
        <h3>Issue Id : {this.state.issueId}</h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Issued-Id</th>
              <th>Book-Title</th>
              <th>Issued-Date</th>
              <th>Expected-Return-Date</th>
              <th>Charge</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {this.state.issuedBooks.map((issuedBook) => (
              <tr key={issuedBook.issuedBookId}>
                <td>{issuedBook.issuedBookId}</td>
                <td>{issuedBook.book.title}</td>
                <td>{issuedBook.startDate}</td>
                <td>{issuedBook.endDate}</td>
                <td>{issuedBook.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <br></br>
        <h3>Returned Books </h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Issued-Id</th>
              <th>Book-Title</th>
              <th>Issued-Date</th>
              <th>Expected-Return-Date</th>
              <th>Charge</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {this.state.issuedBooksR.map((issuedBookR) => (
              <tr key={issuedBookR.issuedBookId}>
                <td>{issuedBookR.issuedBookId}</td>
                <td>{issuedBookR.book.title}</td>
                <td>{issuedBookR.startDate}</td>
                <td>{issuedBookR.endDate}</td>
                <td>{issuedBookR.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ViewIssue;