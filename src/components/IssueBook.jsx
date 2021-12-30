import React from "react";
import ReserveService from "../services/reserve.service";
import IssueService from "../services/issueService";

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
    console.log("issue=>" + JSON.stringify(issue));
    IssueService.postAddBookIssue(issue).then((res) => {
      this.props.history.push("/issueList");
    });
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
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Issue Date</label>
                <input
                  type="date"
                  name="issueDate"
                  required
                  className="form-control"
                  value={this.state.issueDate}
                  onChange={this.changeIssueDate}
                />
              </div>
            </div>
            <div className="col">
              <label>Expected Return Date</label>
              <input
                type="date"
                name="expectedReturnDate"
                required
                className="form-control"
                value={this.state.expectedReturnDate}
                onChange={this.changeExpectedReturnDate}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <button
              className="btn btn-primary"
              style={{ marginLeft: "32px" }}
              onClick={this.addIssue}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default IssueBook;
