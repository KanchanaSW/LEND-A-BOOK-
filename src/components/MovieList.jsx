import React from "react";
import MovieService from "../services/movie.service";

class MovieList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            movies:[],
        };
        this.addMovie=this.addMovie.bind(this);
        this.editMovie=this.editMovie.bind(this);
        this.deleteMovie=this.deleteMovie.bind(this);
        this.viewMovie=this.viewMovie.bind(this);
    }
    componentDidMount(){
        MovieService.getMovieList().then((res)=>{
            this.setState({movies:res.data});
        });
    }
    addMovie(){
        this.props.history.push(`/addMovie`);
    }
    editMovie(movieId){
      this.props.history.push(`/updateMovie/${movieId}`);
    }

    deleteMovie(movieId){
        MovieService.deleteMovieDetails(movieId).then((res)=>{
            this.setState({
                movies:this.state.movies.filter((movie)=>movie.movieId != movieId),
            });
        });
    }
    viewMovie(movieId){
        this.props.history.push(`/movie/${movieId}`);
    }


    render(){
        return (
          <div>
            <div className="btn btn-primary" onClick={this.addMovie}>
              Add new movie
            </div>
            <br />
            <br />
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Writer</th>
                  <th>Status</th>
                  <th>Image</th>
                  <th>18+</th>
                  <th>Summary</th>
                </tr>
              </thead>

              <tbody>
                {this.state.movies.map((movie) => (
                  <tr key={movie.movieId}>
                    <td>{movie.movieId}</td>
                    <td>{movie.title}</td>
                    <td>{movie.writer}</td>
                    <td>{movie.status}</td>
                    <td>{movie.image}</td>
                    <td>{movie.r18}</td>
                    <td>{movie.description}</td>

                    <td>
                      <button
                        onClick={() => this.editMovie(movie.movieId)}
                        className="btn btn-info"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.viewMovie(movie.movieId)}
                        className="btn btn-info"
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.deleteMovie(movie.movieId)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
}
export default MovieList;