import React from "react";
import ReserveService from "../services/reserve.service";
import IssueService from "../services/issueService";

class IssueMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reserveTemp: [],
      list: [],
      tempList: [],
      issueDate: "",
      expectedReturnDate: "",
      movieId: "",
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
    IssueService.postAddMovieIssue(issue).then((res) => {
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
    ReserveService.getUserReservesMovieList().then((res) => {
      console.log(res.data);
      this.setState({ reserveTemp: res.data });
    });
  }
  handleSelect = (movieId) => {
    if (this.state.list == "") {
      this.addItem(movieId);
    } else {
      this.state.list.forEach((x) => {
        if (x == movieId) {
          console.log("exists => " + x);
          this.delete(movieId);
        } else if (x != movieId) {
          this.addItem(movieId);
        }
      });
    }
  };

  addItem = (movieId) => {
    this.setState(() => ({
      list: this.state.list.concat(movieId),
    }));
    console.log(movieId);
  };
  delete(movieId) {
    this.setState(() => ({
      list: this.state.list.filter((el) => el != movieId),
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
              <th>MovieId</th>
            </tr>
          </thead>

          <tbody>
            {this.state.reserveTemp.map((rt) => (
              <tr key={rt.reserveId}>
                <td>
                  <input
                    style={{ paddingLeft: "10px" }}
                    type="checkbox"
                    onClick={() => this.handleSelect(rt.movieId)}
                  />
                </td>
                <td>{rt.reserveId}</td>
                <td>{rt.movieId}</td>
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
export default IssueMovie;
