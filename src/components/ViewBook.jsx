import React, { Component } from "react";
import BookService from "../services/book.service";

class ViewBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isbn: this.props.match.params.isbn,
      book: {},
    };
  }
  componentDidMount() {
    BookService.viewBookDetails(this.state.isbn).then((res) => {
      this.setState({ book: res.data });
    });
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <table class="table table-dark">
          <thead>
            <h4 className="text-center">View Book Details</h4>
          </thead>
          <tbody>
            <tr>
              <th class="" scope="row">
                Book ISBN
              </th>
              <td class="">{this.state.book.isbn}</td>
            </tr>
            <tr>
              <th class="" scope="row">
                Book Title
              </th>
              <td class="">{this.state.book.title}</td>
            </tr>
            <tr>
              <th class="" scope="row">
                Book Author
              </th>
              <td class="">{this.state.book.author}</td>
            </tr>
            <tr>
              <th class="" scope="row">
                Book Publisher
              </th>
              <td class="">{this.state.book.publisher}</td>
            </tr>
            <tr>
              <th class="" scope="row">
                Copies avilable
              </th>
              <td class="">{this.state.book.copiesAvi}</td>
            </tr>
            <tr>
              <th class="" scope="row">
                Book cover Page
              </th>
              <td class="">{this.state.book.coverPage}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default ViewBook;
