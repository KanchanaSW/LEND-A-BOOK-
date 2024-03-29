import React from "react";
import IssueService from "../services/issueService";
import Swal from "sweetalert2";

class IssueListALL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      issuesR: [],
    };
    this.viewIssue = this.viewIssue.bind(this);
  }
  componentDidMount() {
    IssueService.adminViewNotReturned().then((res) => {
      this.setState({ issues: res.data });
      console.log({ issues: res.data });
    });
    IssueService.adminViewReturned().then((res) => {
      this.setState({ issuesR: res.data });
      console.log({ issuesR: res.data });
    });
  }

  viewIssue(issueId) {
    IssueService.getCheckIsBooks(issueId).then((res) => {
      console.log(res.data);
      if (res.data === "books") {
        this.props.history.push(`/issueNR/${issueId}`);
      } else {
        console.log("movies");
        this.props.history.push(`/issueNRmovie/${issueId}`);
      }
    });
  }

  render() {
    return (
      <div>
   
        <h3>Current Issues</h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>IssueId</th>
              <th>Issue-Date</th>
              <th>Expected-Return-Date</th>
              <th>Extended-Return-Date</th>
              <th>Over-Due-Charges</th>
              <th>Total</th>
           {/*    <th>View</th> */}
            </tr>
          </thead>

          <tbody>
            {this.state.issues.map((issue) => (
              <tr key={issue.issueId}>
                <td>{issue.issueId}</td>
                <td>{issue.issueDate}</td>
                <td>{issue.expectedReturnDate}</td>
                <td>{issue.extendReturnDate}</td>
                <td>{issue.overDueCharges}</td>
                <td>{issue.charges}</td>
          
          {/*       <td>
                  <button
                    style={{ marginRight: "14px", marginLeft: "10px" }}
                    className="btn btn-outline-success btn-sm"
                    onClick={() => this.viewIssue(issue.issueId)}
                  >
                    View
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <br></br>
        <h3>Returned Issues</h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>IssueId</th>
              <th>Issue-Date</th>
              <th>Expected-Return-Date</th>
              <th>Extended-Return-Date</th>
              <th>Over-Due-Charges</th>
              <th>Total</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {this.state.issuesR.map((issueR) => (
              <tr key={issueR.issueId}>
                <td>{issueR.issueId}</td>
                <td>{issueR.issueDate}</td>
                <td>{issueR.expectedReturnDate}</td>
                <td>{issueR.extendReturnDate}</td>
                <td>{issueR.overDueCharges}</td>
                <td>{issueR.charges}</td>
                <button
                  style={{ marginRight: "14px", marginLeft: "10px" }}
                  class="btn btn-outline-success btn-sm"
                  onClick={() => this.viewIssue(issueR.issueId)}
                >
                  View
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default IssueListALL;
