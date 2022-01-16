import React from "react";
import Swal from "sweetalert2";
import csvService from "./csvService";

class CSVAddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      title: "",
      length: "",
      status: "",
      image: "",
      r18: "",
      description: "",
      noOfCopies: "",
      pic: "",
      errors: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    csvService.getCSVMovieById(this.state.id).then((res) => {
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
      console.log(movie);
    });
  }
  handleSubmit(event) {
    event.preventDefault();
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

    csvService
      .postCSVAddMovie(movie)
      .then((res) => {
        console.log(res.data);
        if (res.data === "success") {
          Swal.fire({
            title: "Added Success!",
            text: "Check the Movie List!",
            type: "success",
            icon: "success",
          }).then(this.props.history.push("/movieList"));
        } else {
          console.log(res.statusText);
        }
      })
      .catch((error) => {
        if (error.response.data === "existsTitle") {
          Swal.fire({
            title: "Movie already exists with the same Title",
            text: "Added Failed!",
            type: "error",
            icon: "warning",
          }).then(function () {
            console.log("Error : Movie already exists with the same Title");
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
      });
  }

  cancel() {
    this.props.history.push("/csvMovies");
  }

  render() {
    return (
      <div>
        <form>
          <div class="card" style={{ width: "900px" }}>
            <div className="row">
              <div className="col-md-11">
                <h3>CSV Add Movie</h3>
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
              </div>

              <div class="col">
                <div className="form-group">
                  <label>Movie Title</label>
                  <input
                    placeholder="Movie Title"
                    class="form-control"
                    name="title"
                    disabled
                    value={this.state.title}
                  />
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>length</label>
                      <input
                        name="length"
                        class="form-control"
                        disabled
                        value={this.state.length}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Copies</label>
                      <input
                        type="number"
                        name="noOfCopies"
                        disabled
                        min="1"
                        class="form-control"
                        value={this.state.noOfCopies}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>18+</label>
                    <input
                      name="r18"
                      disabled
                      value={this.state.r18}
                      class="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="hidden"
                  name="status"
                  className="form-control"
                  value={this.state.status}
                />
              </div>
              <div className="form-group">
                <input
                  type="hidden"
                  name="image"
                  className="form-control"
                  value={this.state.image}
                />
              </div>
              <div className="form-group">
                <label>Book Summary</label>
                <textarea
                  placeholder="Write the sumarry here"
                  name="description"
                  disabled
                  value={this.state.description}
                  class="form-control"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10"></div>
              <div className="col-md-2">
                <button className="btn btn-success" onClick={this.handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default CSVAddMovie;

