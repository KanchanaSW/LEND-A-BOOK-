import React from "react";
import MovieService from "../services/movie.service";

class UpdateMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: this.props.match.params.movieId,
      title: "",
      length: "",
      status: "",
      image: "",
      r18: "",
      description: "",
      noOfCopies: "",
    };
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeLengthHandler = this.changeLengthHandler.bind(this);
    this.changeStatusHandler = this.changeStatusHandler.bind(this);
    this.changeImageHandler = this.changeImageHandler.bind(this);
    this.changeR18Handler = this.changeR18Handler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeNoOfCopiesHandler = this.changeNoOfCopiesHandler.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
  }

  componentDidMount() {
    MovieService.viewMovieDetails(this.state.movieId).then((res) => {
      let movie = res.data;
      this.setState({
        title: movie.title,
        length: movie.length,
        status: movie.status,
        image: movie.image,
        r18: movie.r18,
        description: movie.description,
        noOfCopies: movie.noOfCopies,
      });
    });
  }

  updateMovie = (e) => {
    e.preventDefault();
    let movie = {
      title: this.state.title,
      length: this.state.length,
      status: this.state.status,
      image: this.state.image,
      r18: this.state.r18,
      description: this.state.description,
      noOfCopies: this.state.noOfCopies,
    };
    console.log("movie=>" + JSON.stringify(movie));

    MovieService.putUpdateMovie(movie, this.state.movieId).then((res) => {
      this.props.history.push("/movieList");
    });
  };

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };
  changeLengthHandler = (event) => {
    this.setState({ length: event.target.value });
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
  uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "movies_cover");

    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/kanchana123/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    //this.setState({ pic: file.secure_url });
    this.setState({ image: file.secure_url });
  };

  cancel() {
    this.props.history.push("/movieList");
  }
  getFormTitle() {
    return <h3 className="text-center"> Update Movie</h3>;
  }

  render() {
    return (
      <div>
        <form>
          <div class="card" style={{ width: "850px" }}>
            <div className="row">
              <div className="col-md-11">
                <h3> Update Movie</h3>
              </div>
              <div className="col-md-1">
                <button
                  className="btn btn-danger"
                  onClick={this.cancel.bind(this)}
                  style={{ marginLeft: "10px" }}
                >
                  X
                </button>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4" style={{ marginRight: "2%" }}>
                <br />
                <img src={this.state.image} class="cover-img-card2" />
                <input type="file" name="file" onChange={this.uploadImage} />
              </div>

              <div class="col">
                <div className="form-group">
                  <input
                    type="hidden"
                    name="movieId"
                    className="form-control"
                    value={this.state.movieId}
                  />
                </div>
                <div className="form-group">
                  <label>Movie Title</label>
                  <input
                    name="title"
                    required
                    className="form-control"
                    value={this.state.title}
                    onChange={this.changeTitleHandler}
                  />
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>length</label>
                      <input
                        type="text"
                        name="length"
                        className="form-control"
                        value={this.state.length}
                        onChange={this.changeLengthHandler}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Copies</label>
                      <input
                        type="number"
                        name="noOfCopies"
                        min="1"
                        className="form-control"
                        value={this.state.noOfCopies}
                        onChange={this.changeNoOfCopiesHandler}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>18+</label>
                      <select
                        name="r18"
                        onChange={this.changeR18Handler}
                        value={this.state.r18}
                        class="form-control"
                      >
                        <option value="false" selected>
                          False
                        </option>
                        <option value="true">True</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        name="status"
                        onChange={this.changeStatusHandler}
                        value={this.state.status}
                        class="form-control"
                      >
                        <option value="Available">Available</option>
                        <option value="UnAvailable">UnAvailable</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="hidden"
                    name="image"
                    className="form-control"
                    value={this.state.image}
                    onChange={this.changeImageHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Movie Summary</label>
                  <textarea
                    placeholder="Write the sumarry here"
                    name="description"
                    className="form-control"
                    value={this.state.description}
                    onChange={this.changeDescriptionHandler}
                    rows="4"
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-md-10"></div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-success"
                      onClick={this.updateMovie}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default UpdateMovie;


/*     <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getFormTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <input
                      type="hidden"
                      name="movieId"
                      className="form-control"
                      value={this.state.movieId}
                    />
                  </div>
                  <div className="form-group">
                    <label>Movie Title</label>
                    <input
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
                      name="writer"
                      className="form-control"
                      value={this.state.writer}
                      onChange={this.changeWriterHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <input
                      type="text"
                      name="status"
                      className="form-control"
                      value={this.state.status}
                      onChange={this.changeStatusHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Image</label>
                    <input
                      name="image"
                      className="form-control"
                      value={this.state.image}
                      onChange={this.changeImageHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Summary</label>
                    <input
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
                      name="noOfCopies"
                      className="form-control"
                      value={this.state.noOfCopies}
                      onChange={this.changeNoOfCopiesHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.updateMovie}
                  >
                    Update
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
        </div> */