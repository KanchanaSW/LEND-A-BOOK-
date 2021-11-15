import React, { Component } from "react";
import BookService from "../services/book.service";

class ViewBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      book: {},
    };
  }
  componentDidMount() {
    BookService.viewBookDetails(this.state.id).then((res) => {
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
                Book ID
              </th>
              <td class="">{this.state.book.id}</td>
            </tr>
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
                Status
              </th>
              <td class="">{this.state.book.status}</td>
            </tr>
            <tr>
              <th class="" scope="row">
                Book cover Page
              </th>
              <td class="">{this.state.book.coverPage}</td>
            </tr>
            <tr>
              <th class="" scope="row">
                Book Summary
              </th>
              <td class="">{this.state.book.summary}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default ViewBook;
