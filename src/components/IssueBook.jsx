import React from "react";
import ReserveService from "../services/reserve.service";
import IssueService from "../services/issueService";
import Swal from "sweetalert2";

class IssueBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reserveTemp: [],
      list: [],
      tempList: [],
      issueDate: "",
      expectedReturnDate: "",
      bookId: "",
    };
    this.show = this.show.bind(this);
    this.addItem = this.addItem.bind(this);
    this.delete = this.delete.bind(this);
    this.changeIssueDate = this.changeIssueDate.bind(this);
    this.changeExpectedReturnDate = this.changeExpectedReturnDate.bind(this);
    this.addIssue = this.addIssue.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  addIssue = (e) => {
    e.preventDefault();
    let issue = {
      list: this.state.list,
      issueDate: this.state.issueDate,
      expectedReturnDate: this.state.expectedReturnDate,
    };
  
    if (this.state.list.length == 0) {
      Swal.fire({
        title: "Issue list is empty",
        text: "Select book to issue",
        type: "error",
        icon: "warning",
      }).then(function () {
        console.log("Error : List empty");
      });
    } else if (this.state.issueDate == "") {
      Swal.fire({
        title: "Issue date is empty",
        text: "Select a issue date to issue",
        type: "error",
        icon: "warning",
      }).then(function () {
        console.log("Error : issue date empty");
      });
    } else if (this.state.expectedReturnDate == "") {
      Swal.fire({
        title: "Expected return date is empty",
        text: "Select a Expected return to issue",
        type: "error",
        icon: "warning",
      }).then(function () {
        console.log("Error :Expected return  date empty");
      });
    }else{

    IssueService.postAddBookIssue(issue)
      .then((res) => {
        console.log(res.data);
        if (res.data === "success") {
          Swal.fire({
            title: "Added Success!",
            text: "Check the Issue List!",
            type: "success",
            icon: "success",
          }).then(this.props.history.push("/issueList"));
        } else if (res.data === "book is un-available") {
          Swal.fire({
            title: "Book is not available",
            text: "Issued failed!",
            type: "error",
            icon: "warning",
          }).then(function () {
            console.log("Error : Book is not available");
          });
        } else if (res.data === "Number of books for subscription is over") {
          Swal.fire({
            title: "Number of books for subscription is over",
            text: "Issued failed!",
            type: "error",
            icon: "warning",
          }).then(function () {
            console.log("Number of books for subscription is over");
          });
        } else {
          Swal.fire({
            title: "Network error",
            text: "Added Failed!",
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
  };
};
  changeIssueDate = (event) => {
    this.setState({ issueDate: event.target.value });
  };
  changeExpectedReturnDate = (event) => {
    this.setState({ expectedReturnDate: event.target.value });
  };

  componentDidMount() {
    ReserveService.getUserReserversList().then((res) => {
      this.setState({ reserveTemp: res.data });
    });
  }
  handleSelect = (bookId) => {
    if (this.state.list == "") {
      this.addItem(bookId);
    } else {
      this.state.list.forEach((x) => {
        if (x == bookId) {
          console.log("exists => " + x);
          this.delete(bookId);
        } else if (x != bookId) {
          this.addItem(bookId);
        }
      });
    }
  };

  addItem = (bookId) => {
    this.setState(() => ({
      list: this.state.list.concat(bookId),
    }));
    console.log(bookId);
  };
  delete(bookId) {
    this.setState(() => ({
      list: this.state.list.filter((el) => el != bookId),
    }));
  }
  show = (res) => {
    console.log(this.state.list);
  };
  render() {
    return (
      <div>
        <h3>Reserves</h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>Reserve-Id</th>
              <th>BookId</th>
              <th>Book-Title</th>
            </tr>
          </thead>

          <tbody>
            {this.state.reserveTemp.map((rt) => (
              <tr key={rt.reserveId}>
                <td>
                  <input
                    style={{ paddingLeft: "10px" }}
                    type="checkbox"
                    onClick={() => this.handleSelect(rt.book.id)}
                  />
                </td>
                <td>{rt.reserveId}</td>
                <td>{rt.book.id}</td>
                <td>{rt.book.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <br></br>
        <div>
          <div className="row" style={{ textAlign: "center", margin: "auto" }}>
            <div
              className="col"
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                float: "none",
              }}
            >
              <div className="form-group">
                <label>Issue Date</label>
                <input
                  type="date"
                  name="issueDate"
                  required
                  min="2022-02-12"
                  max="2022-03-12"
                  className="form-control"
                  value={this.state.issueDate}
                  onChange={this.changeIssueDate}
                />
              </div>
            </div>
            <div
              className="col"
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                float: "none",
              }}
            >
              <label>Expected Return Date</label>
              <input
                type="date"
                name="expectedReturnDate"
                required
                min="2022-02-13"
                max="2022-04-12"
                className="form-control"
                value={this.state.expectedReturnDate}
                onChange={this.changeExpectedReturnDate}
              />
            </div>
            <div
              className="col"
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                float: "none",
              }}
            >
              <button
                className="btn btn-primary"
                style={{ marginLeft: "32px", marginTop: "35px" }}
                onClick={this.addIssue}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default IssueBook;
