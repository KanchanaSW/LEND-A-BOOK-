import React from "react";
import MovieService from "../services/movie.service";

class ViewMovie extends React.Component{
    constructor(props){
        super(props);
        this.state={
            movieId:this.props.match.params.movieId,
            movie:{},
        };
    }
    componentDidMount(){
        MovieService.viewMovieDetails(this.state.movieId).then((res)=>{
            this.setState({movie:res.data});console.log(this.state.movie);
        });
    }
    render(){
        return (
          <div>
            <div class="card mb-3" style={{ maxWidth: "800px" }}>
              <div class="row g-0">
                <div class="col-5 col-lg-4">
                  <br />
                  <br />
                  <img
                    src={this.state.movie.image}
                    class="img-fluid rounded-start"
                  />
                </div>
                <div class="col-7 col-lg-8">
                  <div class="card-body">
                    <h5 class="card-title">{this.state.movie.title}</h5>
                    <p class="card-text">{this.state.movie.description}</p>
                    <p class="card-text">
                      <small class="text-muted">
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">
                            {this.state.movie.movieId}
                          </li>
                          <li class="list-group-item">
                            {this.state.movie.length}
                          </li>
                          <li class="list-group-item">
                            {this.state.movie.status}
                          </li>
                          <li class="list-group-item">
                           18+ : {`${this.state.movie.r18}`}
                          </li>
                          <li class="list-group-item">
                            {this.state.movie.noOfCopies}
                          </li>
                        </ul>
                      </small>
                    </p>
                  </div>
                  <div class="card-body">
                    <a href="#" class="card-link">
                      Reserve
                    </a>
                    <a href="#" class="card-link">
                      Another link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }

}
export default ViewMovie;