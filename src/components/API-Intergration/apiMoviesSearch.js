import React, { useState } from "react";
import axios from "axios";

function ApiMoviesSearch() {
  const [movie, setMovie] = useState("");
  const [empty, setEmpty] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState("cca38250fab9f053ee440931ed220cb8");

  function handleChange(event) {
    const movie = event.target.value;
    setMovie(movie);
  }
  //https://api.themoviedb.org/3/search/movie?api_key=cca38250fab9f053ee440931ed220cb8&query=harry
  //https://image.tmdb.org/t/p/w185/8rft8A9nH43IReybFtYt21ezfMK.jpg
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=" +
          apiKey +
          "&query=" +
          movie
      )
      .then((data) => {
        console.log(data.data.results);
        if (data.data.results == 0) {
          setEmpty("no records");
          setResult(data.data.results);
        } else if (data.data.results != 0) {
          setEmpty("");
          setResult(data.data.results);
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
              placeholder="Type Movie Name..."
              type="text"
            />
          </div>
          <div className="col">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary search-btn"
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <span className="empty">{empty}</span>
          {result.map((movie) => (
            <div class="card mb-3" style={{ maxWidth: "500px" }}>
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    className="img1"
                    src={"https://image.tmdb.org/t/p/w185/" + movie.poster_path}
                    alt={movie.title}
                  ></img>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 class="card-title">{movie.title}</h5>
                    <p className="card-text2">{movie.overview}</p>
                    <p class="card-text">
                      <small>{movie.release_date}</small>
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

export default ApiMoviesSearch;
