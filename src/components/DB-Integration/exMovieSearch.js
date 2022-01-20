import React, { useState } from "react";
import Swal from "sweetalert2";
import externalServices from "./external.services";
import { useHistory } from "react-router-dom";

function ExMovieSearch() {
   const history = useHistory();
  const [movie, setMovie] = useState("");
  const [result, setResult] = useState([]);
  const [movieId, setMovieId] = useState("");

  function handleChange(event) {
    const movie = event.target.value;
    setMovie(movie);
  }
  function handleSubmit(event) {
    event.preventDefault();
    externalServices.searchMovie(movie).then((data) => {
      console.log(data.data);
      setResult(data.data);
    });
  }
  function handleAddMovie(event) {
    const movieId = event.target.value;
    setMovieId(movieId);
    var id = Number(movieId);
    console.log("movie id ");
    console.log(id);
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to add the Movie to System Database?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        externalServices
          .addEXMovie(id)
          .then((res) => {
            console.log(res.data);
            if (res.data === "success") {
              Swal.fire({
                title: "Added Success!",
                text: "Check the Movie List!",
                type: "success",
                icon: "success",
              }).then(history.push("/movieList"));
            } else {
              console.log(res.statusText);
            }
          })
          .catch((error) => {
            if (error.response.data === "existsTitle") {
              Swal.fire({
                title: "Book already exists with the same Title",
                text: "Added Failed!",
                type: "error",
                icon: "warning",
              }).then(function () {
                console.log("Error : movie already exists with the same title");
              });
            } else if (error.response.data === "dontExists") {
              Swal.fire({
                title: "Movie dont exists with the same Id",
                text: "Added Failed!",
                type: "error",
                icon: "warning",
              }).then(function () {
                console.log("Error : movie already exists with the same id");
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
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-header main-search">
        <div className="row">
          <div className="col-10">
            <input
              onChange={handleChange}
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
      <div className="container">
        <div className="row">
          {result.map((movie) => (
            <div class="card mb-3" style={{ maxWidth: "500px" }}>
              <div class="row g-0">
                <div class="col md-4">
                  <img
                    src={movie.image !== undefined ? movie.image : ""}
                    alt={movie.title}
                  ></img>
                </div>
                <div class="col md-8">
                  <div class="card-body">
                    <h5 class="card-title">{movie.title}</h5>
                    <h6 className="card-author">{movie.length} long</h6>
                    <p className="card-text2">{movie.description}...</p>
                    <p class="card-text">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={handleAddMovie}
                        value={movie.id}
                      >
                        Add
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
export default ExMovieSearch;
