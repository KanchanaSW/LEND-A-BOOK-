import React from "react";
import MovieService from "../services/movie.service";
import Swal from "sweetalert2";

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
      errors: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  handleInputChange(event) {
    var key = event.target.name;
    var value = event.target.value;
    var obj = {};
    obj[key] = value;
    this.setState(obj);
  }
 

  handleSubmit(event) {
    event.preventDefault();
    //validate
    var errors = [];
    //isbn
    if (this.state.title === "") {
      errors.push("title");
    }
    //length
    if (this.state.length === "") {
      errors.push("length");
    } else if (this.state.length.length < 0) {
      errors.push("length");
    }
    //description
    if (this.state.description === "") {
      errors.push("description");
    }
    //no-of-copies
    if (this.state.noOfCopies === "") {
      errors.push("noOfCopies");
    }

    this.setState({ errors: errors });

    if (errors.length > 0) {
      return false;
    } else {
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

        MovieService.putUpdateMovie(movie, this.state.movieId).
        then((res) => {
               
                 Swal.fire({
                   title: "Updated Success!",
                   text: "Check the Movie List!",
                   type: "success",
                   icon: "success",
                 }).then(this.props.history.push("/movieList"));
              
        }).catch((error)=>{
               if (error.response.data === "dontExists") {
                 Swal.fire({
                   title: "Movie dont exists with id",
                   text: "Updated Failed!",
                   type: "error",
                   icon: "warning",
                 }).then(function () {
                   console.log(
                     "Error : "
                   );
                 });
               }else  if (error.response.data === "error") {
                 Swal.fire({
                   title: "Something went wrong",
                   text: "Updated Failed!",
                   type: "error",
                   icon: "warning",
                 }).then(function () {
                   console.log("Error : ");
                 });
               } else {
                 Swal.fire({
                   title: "Network error",
                   text: "Added Failed!",
                   type: "error",
                   icon: "warning",
                 }).then(function () {
                   console.log("Exception error");
                 });
               }
        })
    }
  }

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
                    onChange={this.handleInputChange}
                    className={
                      this.hasError("title")
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  <div
                    className={
                      this.hasError("title") ? "inline-errormsg" : "hidden"
                    }
                  >
                    Please enter a valid title
                  </div>
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
                        onChange={this.handleInputChange}
                        className={
                          this.hasError("length")
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      <div
                        className={
                          this.hasError("length") ? "inline-errormsg" : "hidden"
                        }
                      >
                        Please enter a valid length
                      </div>
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
                        onChange={this.handleInputChange}
                        className={
                          this.hasError("noOfCopies")
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      <div
                        className={
                          this.hasError("noOfCopies")
                            ? "inline-errormsg"
                            : "hidden"
                        }
                      >
                        Please enter a valid noOfCopies
                      </div>
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
                    rows={4}
                    maxLength={225}
                    onChange={this.handleInputChange}
                    className={
                      this.hasError("description")
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  ></textarea>
                  <div
                    className={
                      this.hasError("description")
                        ? "inline-errormsg"
                        : "hidden"
                    }
                  >
                    Please enter a valid description
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-10"></div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-success"
                      onClick={this.handleSubmit}
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

/* 
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
 */
