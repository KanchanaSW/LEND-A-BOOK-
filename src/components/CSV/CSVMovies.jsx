import React from "react";
import csvService from "./csvService";

class CSVMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesNew: [],
      moviesExists: [],
    };
    this.addMovie = this.addMovie.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
  }
  componentDidMount() {
    csvService.getCSVBMoviesNew().then((res) => {
      this.setState({ moviesNew: res.data });
      console.log({ moviesNew: res.data });
    });
    csvService.getCSVMoviesExists().then((res1) => {
      this.setState({ moviesExists: res1.data });
      console.log("exists movies ex =>" + { moviesExists: res1.data });
    });
  }

  addMovie(id) {
    this.props.history.push(`/csvAddMovie/${id}`);
  }
  updateMovie(id) {
    this.props.history.push(`/csvUpdateMovie/${id}`);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <h3>New Movies on CSV file</h3>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Cover-Image</th>
                  <th>Movie-Title</th>
                  <th>Movie-Length</th>
                  <th>Add</th>
                </tr>
              </thead>

              <tbody>
                {this.state.moviesNew.map((movie) => (
                  <tr key={movie.movieId}>
                    <td>
                      <img
                        src={movie.image}
                        style={{ width: "100px", height: "150px" }}
                      />
                    </td>
                    <td className="x" style={{ maxWidth: "300px" }}>
                      {movie.title}
                    </td>
                    <td>{movie.length}</td>
                    <td>
                      <button
                        class="btn btn-outline-primary btn-sm"
                        onClick={() => this.addMovie(movie.movieId)}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col">
            <h3>Existing Books on CSV file</h3>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Cover-Image</th>
                  <th>Movie-Title</th>
                  <th>Movie-Length</th>
                </tr>
              </thead>

              <tbody>
                {this.state.moviesExists.map((movieExists) => (
                  <tr key={movieExists.movieId}>
                    <td>
                      <img
                        src={movieExists.image}
                        style={{ width: "100px", height: "150px" }}
                      />
                    </td>
                    <td className="x" style={{ maxWidth: "300px" }}>
                      {movieExists.title}
                    </td>
                    <td>{movieExists.length}</td>
                    <td>
                      <button
                        class="btn btn-outline-primary btn-sm"
                        onClick={() => this.updateMovie(movieExists.movieId)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default CSVMovies;
