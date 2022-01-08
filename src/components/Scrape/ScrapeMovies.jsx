import React from "react";
import scrapeServices from "./scrape.services";

class ScrapeMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrapeMovies: [],
    };
  }
  componentDidMount() {
    scrapeServices.getScrapeMovies().then((res) => {
      this.setState({ scrapeMovies: res.data });
      console.log({ scrapeMovies: res.data });
    });
  }

  render() {
    return (
      <div>
        <h3>Competitors Movie Rent Prices</h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Cover-Image</th>
              <th>Movie-Title</th>
              <th>Price</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {this.state.scrapeMovies.map((movie) => (
              <tr key={movie.movieTitle}>
                <td>
                  <img
                    src={movie.coverImage}
                    style={{ width: "100px", height: "150px" }}
                  />
                </td>
                <td style={{width:"700px"}}>{movie.movieTitle}</td>
                <td>{movie.rentPrice}</td>
                <td>
                  <a href={movie.urlLink}>View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ScrapeMovies;
