import React from "react";
import ReserveService from "../services/reserve.service";
import IssueService from "../services/issueService";

class IssueBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reserveTemp: [],
      list: [],
      issueDate: "",
      expectedReturnDate: "",
    };
    this.show = this.show.bind(this);
    this.delete = this.delete.bind(this);
    this.changeIssueDate = this.changeIssueDate.bind(this);
    this.changeExpectedReturnDate = this.changeExpectedReturnDate.bind(this);
    this.addIssue = this.addIssue.bind(this);
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

  addItem = (bookId) => {
    this.setState((prevState) => ({
      list: [...prevState.list, bookId],
    }));
  };
  delete(bookId) {
    this.setState((prevState) => ({
      list: prevState.list.filter((el) => el != bookId),
    }));
  }
  show = () => {
    console.log(this.state.list);
  };
  render() {
    return (
      <div>
        <h3>Reserves</h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Reserve-Id</th>
              <th>BookId</th>
            </tr>
          </thead>

          <tbody>
            {this.state.reserveTemp.map((rt) => (
              <tr key={rt.issueId}>
                <td>{rt.reserveId}</td>
                <td>{rt.bookId}</td>
                <td>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => this.addItem(rt.bookId)}
                  >
                    add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <br></br>
        <div>
          <ol>
            {this.state.list.map((subItems, sIndex) => {
              return (
                (<li key={subItems + sIndex}> {subItems}</li>),
                (
                  <li>
                    <p
                      style={{ color: "red", marginLeft: "10px" }}
                      onClick={this.delete.bind(this, subItems)}
                    >
                      x
                    </p>
                  </li>
                )
              );
            })}
          </ol>
         
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
