import React from "react";
import MovieService from "../services/movie.service";
import Swal from "sweetalert2";
import AuthService from "../services/auth.service";

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      name: "",
      empty: "",
    };
    this.addMovie = this.addMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.viewMovie = this.viewMovie.bind(this);
    this.hc=this.hc.bind(this);
    this.hs=this.hs.bind(this);
  }

  hc(event){
 var value = event.target.value;
 this.setState({ name: value });
  }
  hs(event){
   event.preventDefault();
   var v = "ALL";
   var z = "";
   if (this.state.name == "") {
     z = v;
     console.log(z);
   } else {
     z = this.state.name;
     console.log(z);
   }
   MovieService.searchMovie(z).then((data) => {
     console.log(data.data);
     if (data.data == 0) {
       var x = "no books found";
       this.setState({ empty: x });
       this.setState({ movies: data.data });
       console.log(this.state.empty);
     } else if (data.data != 0) {
       this.setState({ empty: "" });
       this.setState({ movies: data.data });
     }
   });
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
  showAddBtn() {
    const user = AuthService.getCurrentUser();
    console.log(user.roles);
    //this.setState({ user: user.roles });
    if (user.roles == "ROLE_ADMIN") {
      return (
        <div className="btn btn-primary" onClick={this.addMovie}>
          Add new movie
        </div>
      );
    }
  }
  showEditDelet(id) {
    const user = AuthService.getCurrentUser();
    console.log(user.roles);
    //this.setState({ user: user.roles });
    if (user.roles == "ROLE_ADMIN") {
      //   console.log("admin" + id);
      return (
        <div>
          <button
            style={{ marginRight: "8px" }}
            class="btn btn-outline-primary btn-sm"
            onClick={() => this.editMovie(id)}
          >
            Edit
          </button>
          <button
            style={{ marginRight: "auto" }}
            class="btn btn-outline-danger btn-sm"
            onClick={() => this.deleteMovie(id)}
          >
            X
          </button>
        </div>
      );
    } else {
      //console.log("user" + id);
    }
  }

  render() {
    return (
      <div>
        {this.showAddBtn()}
        <form onSubmit={this.hs}>
          <div className="card-header main-search">
            <div className="row">
              <div className="col-10">
                <input
                  onChange={this.hc}
                  value={this.state.name}
                  className="AutoFocus form-control"
                  placeholder="Type movie title..."
                  type="text"
                />
              </div>
              <div className="col">
                <input
                  type="submit"
                  value="🔍 Search"
                  className="btn btn-primary search-btn"
                />
              </div>
            </div>
          </div>

          <div className="row">
            {this.state.movies.map((movie) => (
              <div class="card mb-3" style={{ maxWidth: "500px" }}>
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src={movie.image} className="img1" alt={movie.title} />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text2">{movie.description}....</p>

                      <p class="card-text">
                        <table style={{ display: "flex" }}>
                          {this.showEditDelet(movie.movieId)}
                          <button
                            class="btn btn-link"
                            onClick={() => this.viewMovie(movie.movieId)}
                          >
                            Read More
                          </button>
                        </table>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <span className="empty">{this.state.empty}</span>
          </div>
        </form>
      </div>
    );
  }
}
export default MovieList;
