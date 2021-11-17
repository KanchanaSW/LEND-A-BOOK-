import React from "react";
import MovieService from "../services/movie.service";

class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      writer: "",
      status: "Available",
      image: "",
      r18: "",
      description: "",
      noOfCopies: "",
    };
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeWriterHandler = this.changeWriterHandler.bind(this);
    this.changeStatusHandler = this.changeStatusHandler.bind(this);
    this.changeImageHandler = this.changeImageHandler.bind(this);
    this.changeR18Handler = this.changeR18Handler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeNoOfCopiesHandler = this.changeNoOfCopiesHandler.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
  }
  saveMovie = (e) => {
    e.preventDefault();
    let movie = {
      title: this.state.title,
      writer: this.state.writer,
      status: this.state.status,
      image: this.state.image,
      r18: this.state.r18,
      description: this.state.description,
      noOfCopies: this.state.noOfCopies,
    };
    console.log("movie=>" + JSON.stringify(movie));

    MovieService.postAddMovie(movie).then((res) => {
      this.props.history.push("/movieList");
    });
  };

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };
  changeWriterHandler = (event) => {
    this.setState({ writer: event.target.value });
  };
  changeStatusHandler = (event) => {
    this.setState({ status: event.target.value });
  };
  changeImageHandler = (event) => {
    this.setState({ image: event.target.value });
  };
  changeR18Handler = (event) => {
    this.setState({ r18: event.target.value });
  };
  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };
  changeNoOfCopiesHandler = (event) => {
    this.setState({ noOfCopies: event.target.value });
  };

  cancel() {
    this.props.history.push("/movieList");
  }
  getFormTitle() {
    return <h3 className="text-center"> Add Movie</h3>;
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getFormTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Movie Title</label>
                    <input
                      placeholder="Movie Title"
                      name="title"
                      required
                      className="form-control"
                      value={this.state.title}
                      onChange={this.changeTitleHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Writer</label>
                    <input
                      placeholder="Movie writer"
                      name="writer"
                      className="form-control"
                      value={this.state.writer}
                      onChange={this.changeWriterHandler}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="hidden"
                      name="status"
                      className="form-control"
                      value={this.state.status}
                      onChange={this.changeStatusHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image</label>
                    <input
                      placeholder="URL"
                      name="image"
                      className="form-control"
                      value={this.state.image}
                      onChange={this.changeImageHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>18+</label>
                    <input
                      name="r18"
                      className="form-control"
                      value={this.state.r18}
                      onChange={this.changeR18Handler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Summary</label>
                    <input
                      placeholder="Write the sumarry here"
                      name="description"
                      className="form-control"
                      value={this.state.description}
                      onChange={this.changeDescriptionHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Copies</label>
                    <input
                      type="number"
                      placeholder="100"
                      name="noOfCopies"
                      className="form-control"
                      value={this.state.noOfCopies}
                      onChange={this.changeNoOfCopiesHandler}
                    />
                  </div>

                  <button className="btn btn-success" onClick={this.saveMovie}>
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddMovie;