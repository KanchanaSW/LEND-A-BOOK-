import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/admin/";

class IssueService {
    
  postAddBookIssue = (issue) => {
    return axios.post(API_URL + "addNewIssue", issue, {
      headers: authHeader(),
    });
  };
  getExtendIssueBook = (issueId) => {
    return axios.get(API_URL + "extendIssue/" + issueId, {
      headers: authHeader(),
    });
  };
  getReturnIssuedBook = (issueId) => {
    return axios.get(API_URL + "returnAllBooks/" + issueId, {
      headers: authHeader(),
    });
  };
  getReturnABook = (issuedBookId) => {
    return axios.get(API_URL + "returnABook/" + issuedBookId, {
      headers: authHeader(),
    });
  };
  getViewMyIssuesListNR = () => {
    return axios.get(API_URL + "viewMyIssues", { headers: authHeader() });
  };
  getViewMyIssuedBooksListNR = (issueId) => {
    return axios.get(API_URL + "viewIssuedBooks/" + issueId, {
      headers: authHeader(),
    });
  };

  // returned Issues (Completed issues)
  getViewMyIssuesListR = () => {
    return axios.get(API_URL + "viewMyReturnedIssues", {
      headers: authHeader(),
    });
  };
  //returned issued books.
  getViewMyIssuedBooksListR = (issueId) => {
    return axios.get(API_URL + "viewReturnedIssuedBooks/" + issueId, {
      headers: authHeader(),
    });
  };
}
export default new IssueService();