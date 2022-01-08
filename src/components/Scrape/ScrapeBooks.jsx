import React from "react";
import scrapeServices from "./scrape.services";

class ScrapeBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scarpeBooks: [],
    };
  }
  componentDidMount() {
    scrapeServices.getScrapeBooks().then((res)=>{
        this.setState({ scarpeBooks:res.data });
        console.log({scrapeBooks:res.data});
    })
  }


  render() {
    return (
      <div>
        <h3>Competitors Book Rent Prices</h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Cover-Image</th>
              <th>Book-Title</th>
              <th>Book-Author</th>
              <th>Price</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {this.state.scarpeBooks.map((book) => (
              <tr key={book.bookTitle}>
                <td>
                  <img
                    src={book.coverImage}
                    style={{ width: "100px", height: "150px" }}
                  />
                </td>
                <td className="x" style={{ maxWidth: "300px" }}>
                  {book.bookTitle}
                </td>
                <td>{book.bookAuthor}</td>
                <td>{book.price}</td>
                <td>
                  <a href={book.bookLink}>View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ScrapeBooks;
