import React from "react";
import IssueService from "../services/issueService";

class IssueList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            issuedBooks:[],
        }

    }
    componentDidMount(){
        IssueService.getViewMyIssuesListNR().then((res)=>{
            this.setState({ issuedBooks: res.data });
            console.log({ issuedBooks: res.data });
        });
    }

    render(){
        return (
          <div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>IssueId</th>
                  <th>Book Id</th>
                  <th>Issue-Date</th>
                  <th>Expected-Return-Date</th>
                  <th>Charges</th>
                  <th>Over-Due-Charges</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {this.state.issuedBooks.map((issuedBook) => (
                  <tr key={issuedBook.issuedBookId}>
                    <td>{issuedBook.issue.issueId}</td>
                    <td>{issuedBook.book.id}</td>
                    <td>{issuedBook.issue.issueDate}</td>
                    <td>{issuedBook.issue.expectedReturnDate}</td>
                    <td>{issuedBook.issue.charges}</td>
                    <td>{issuedBook.issue.overDueCharges}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }


}
export default IssueList;