import React from "react";
import MovieService from "../services/movie.service";
import Swal from "sweetalert2";

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
    this.addMovie = this.addMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.viewMovie = this.viewMovie.bind(this);
  }
  componentDidMount() {
    MovieService.getMovieList().then((res) => {
      this.setState({ movies: res.data });
    });
  }
  addMovie() {
    this.props.history.push(`/addMovie`);
  }
  editMovie(movieId) {
    this.props.history.push(`/updateMovie/${movieId}`);
  }

  deleteMovie(movieId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        MovieService.deleteMovieDetails(movieId)
          .then((res) => {
            this.setState({
              movies: this.state.movies.filter(
                (movie) => movie.movieId != movieId
              ),
            });
          })
          .catch((error) => {
            if (error.response.data === "dontExists") {
              Swal.fire({
                title: "Cannot find the movie",
                text: "Delete Failed!",
                type: "error",
                icon: "warning",
              }).then(function () {
                console.log("Error : Cannot find the book");
              });
            } else {
              Swal.fire({
                title: "Movie has issued",
                text: "Delete Failed!",
                type: "error",
                icon: "warning",
              }).then(function () {
                console.log("Exception error");
              });
            }
          });
      }
    });
  }
  viewMovie(movieId) {
    this.props.history.push(`/movie/${movieId}`);
  }

  render() {
    return (
      <div>
        <div className="btn btn-primary" onClick={this.addMovie}>
          Add new movie
        </div>
        <div className="row">
          {this.state.movies.map((movie) => (
            <div className="col-md-3" key={movie.movieId}>
              <div className="card bwm-card">
                <img src={movie.image} className="cover-img-card" />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text2">{movie.description}....</p>
                </div>
                <table>
                  <button
                    style={{ marginRight: "14px", marginLeft: "10px" }}
                    class="btn btn-outline-success btn-sm"
                    onClick={() => this.viewMovie(movie.movieId)}
                  >
                    Read More
                  </button>
                  <button
                    style={{ marginRight: "14px" }}
                    class="btn btn-outline-primary btn-sm"
                    onClick={() => this.editMovie(movie.movieId)}
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    onClick={() => this.deleteMovie(movie.movieId)}
                  >
                    X
                  </button>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default MovieList;
