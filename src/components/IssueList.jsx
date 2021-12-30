import React from "react";
import IssueService from "../services/issueService";
import Swal from "sweetalert2";

class IssueList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      issuesR: [],
    };
    this.viewIssue = this.viewIssue.bind(this);
    this.viewReserves = this.viewReserves.bind(this);
    this.viewMovieReserves = this.viewMovieReserves.bind(this);
    this.extendIssueDate = this.extendIssueDate.bind(this);
  }
  componentDidMount() {
    IssueService.getViewMyIssuesListNR().then((res) => {
      this.setState({ issues: res.data });
      console.log({ issues: res.data });
    });
    IssueService.getViewMyIssuesListR().then((res) => {
      this.setState({ issuesR: res.data });
      console.log({ issuesR: res.data });
    });
  }
  extendIssueDate(issueId) {   
    /* IssueService.getExtendIssue(issueId).then((res)=>{
        window.location.reload(false);
    }) */
    

    IssueService.getExtendIssue(issueId)
      .then((res) => {
        console.log(res.data);
        if (res.data === "success") {
          Swal.fire({
            title: "Extended Success!",
            text: "Check the Issue List!",
            type: "success",
            icon: "success",
          }).then(window.location.reload(false));
        } else if (res.data === "Already extended") {
          Swal.fire({
            title: "Already extended",
            text: "Already extended!",
            type: "error",
            icon: "warning",
          }).then(function () {
            console.log("Error : Already extended");
          });
        }  else {
          Swal.fire({
            title: "Network error",
            text: "Extend Failed!",
            type: "error",
            icon: "warning",
          }).then(function () {
            console.log("Exception error");
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Network error",
          text: "Added Failed!",
          type: "error",
          icon: "warning",
        }).then(function () {
          console.log(error.response.data);
        });
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
  viewReserves() {
    this.props.history.push(`/issueBook`);
  }
  viewMovieReserves(){
    this.props.history.push(`/issueMovie`);
  }

  render() {
    return (
      <div>
        <div className="btn btn-primary" onClick={this.viewReserves}>
          Reserves
        </div>
        <div className="btn btn-primary" onClick={this.viewMovieReserves}>
          Movie-Reserves
        </div>
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
              <th>Extend</th>
              <th>View</th>
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
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => this.extendIssueDate(issue.issueId)}
                  >
                    Extend
                  </button>
                </td>
                <td>
                  <button
                    style={{ marginRight: "14px", marginLeft: "10px" }}
                    className="btn btn-outline-success btn-sm"
                    onClick={() => this.viewIssue(issue.issueId)}
                  >
                    View
                  </button>
                </td>
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
export default IssueList;