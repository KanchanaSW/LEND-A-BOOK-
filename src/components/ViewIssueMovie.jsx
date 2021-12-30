import React, { Component } from "react";
import IssueService from "../services/issueService";
import Swal from "sweetalert2";

class ViewIssueMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueId: this.props.match.params.issueId,
      issuedMovies: [],
      issuedMoviesR: [],
    };
    this.returnMovie = this.returnMovie.bind(this);
  }
  returnMovie(issuedMovieId) {
    /*  IssueService.getReturnAMovie(issuedMovieId).then((res) => {
      this.props.history.push("/issueList");
    //  console.log({ x: res.data } + "// status //" + res.status);
    }); */
    IssueService.getReturnAMovie(issuedMovieId)
      .then((res) => {
        console.log(res.data);
        if (res.data === "success") {
          Swal.fire({
            title: "Return book Success!",
            text: "Check the Issued movie List!",
            type: "success",
            icon: "success",
          }).then(this.props.history.push("/issueList"));
        } else if (res.data === "un-success") {
          Swal.fire({
            title: "Error occured",
            text: "Return faild!",
            type: "error",
            icon: "warning",
          }).then(function () {
            console.log("Error : un-successfull");
          });
        } else {
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
  componentDidMount() {
    IssueService.getViewSingleIssuedNR(this.state.issueId).then((res) => {
      this.setState({ issuedMovies: res.data });
      console.log({ issuedMovies: res.data });
    });
    IssueService.getViewSingleIssuedR(this.state.issueId).then((res) => {
      this.setState({ issuedMoviesR: res.data });
      console.log("Returned movie list");
      console.log({ issuedMoviesR: res.data });
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
              <th>Movie-Title</th>
              <th>Issued-Date</th>
              <th>Expected-Return-Date</th>
              <th>Charge</th>
              <th>Return</th>
            </tr>
          </thead>

          <tbody>
            {this.state.issuedMovies.map((im) => (
              <tr key={im.issuedMovieId}>
                <td>{im.issuedMovieId}</td>
                <td>{im.movie.title}</td>
                <td>{im.startDate}</td>
                <td>{im.endDate}</td>
                <td>{im.amount}</td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => this.returnMovie(im.issuedMovieId)}
                  >
                    Return
                  </button>
                </td>
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
            {this.state.issuedMoviesR.map((imR) => (
              <tr key={imR.issuedMovieId}>
                <td>{imR.issuedMovieId}</td>
                <td>{imR.movie.title}</td>
                <td>{imR.startDate}</td>
                <td>{imR.endDate}</td>
                <td>{imR.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ViewIssueMovie;
