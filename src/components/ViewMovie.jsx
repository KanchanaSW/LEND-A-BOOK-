import React, { Component } from "react";
import MovieService from "../services/movie.service";
import IssueService from "../services/issueService";
import ReserveService from "../services/reserve.service";

class ViewMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: this.props.match.params.movieId,
      movie: {},
    };
    this.saveReserve = this.saveReserve.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  componentDidMount() {
    MovieService.viewMovieDetails(this.state.movieId).then((res) => {
      this.setState({ movie: res.data });
      console.log(this.state.movie);
    });
  }
  saveReserve = (e) => {
    e.preventDefault();
    let reserveTemp = {
      movieId: this.state.movieId,
    };
    console.log("temp Reserve=>" + JSON.stringify(reserveTemp));
    ReserveService.postReserve(reserveTemp).then((res) => {
      this.props.history.push("/movieList");
    });
  };
  cancel=(e) =>{
    //e.preventDefault();
this.props.history.push("/movieList");
  }

  render() {
    return (
      <div>
        <div class="card mb-3" style={{ maxWidth: "800px" }}>
          <div className="row">
            <div className="col-md-11">{/*        <h3>View Movie</h3> */}</div>
            <div className="col-md-1">
              <button className="btn btn-danger" onClick={this.cancel}>
                X
              </button>
            </div>
          </div>
          <div class="row g-0" style={{ marginTop: "-12px" }}>
            <div class="col-5 col-lg-4">
              <br />
              <br />
              <img
                src={this.state.movie.image}
                class="img2"
                alt={this.state.movie.title}
              />
            </div>
            <div class="col-7 col-lg-8">
              <div class="card-body">
                <h5 class="card-title">{this.state.movie.title}</h5>
                <p class="card-text">{this.state.movie.description}</p>
                <p className="card-text"> {this.state.movie.length} </p>
                <p class="card-text">
                  {" "}
                  {this.state.movie.noOfCopies} :<b> Copies</b>{" "}
                  {this.state.movie.status}
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
export default ViewMovie;
