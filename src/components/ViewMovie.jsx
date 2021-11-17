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
            this.setState({movie:res.data});
        });
    }
    render(){
        return (
          <div>
            <br />
            <br />
            <table class="table table-dark">
              <thead>
                <h4 className="text-center">View Movie Details</h4>
              </thead>
              <tbody>
                <tr>
                  <th class="" scope="row">
                    Movie ID
                  </th>
                  <td class="">{this.state.movie.movieId}</td>
                </tr>
                <tr>
                  <th class="" scope="row">
                    Movie Title
                  </th>
                  <td class="">{this.state.movie.title}</td>
                </tr>
                <tr>
                  <th class="" scope="row">
                    Movie Writer
                  </th>
                  <td class="">{this.state.movie.writer}</td>
                </tr>
                <tr>
                  <th class="" scope="row">
                    Status
                  </th>
                  <td class="">{this.state.movie.status}</td>
                </tr>
                <tr>
                  <th class="" scope="row">
                    Movie Image
                  </th>
                  <td class="">{this.state.movie.image}</td>
                </tr>
                <tr>
                  <th class="" scope="row">
                    Movie description
                  </th>
                  <td class="">{this.state.movie.description}</td>
                </tr>
                <tr>
                  <th class="" scope="row">
                    18+
                  </th>
                  <td class="">{this.state.movie.r18}</td>
                </tr>
                <tr>
                  <th class="" scope="row">
                    Number of Copies
                  </th>
                  <td class="">{this.state.movie.noOfCopies}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
    }

}
export default ViewMovie;