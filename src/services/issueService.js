import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/admin/";

class IssueService {
  postAddBookIssue = (issue) => {
    return axios.post(API_URL + "addNewIssue", issue, {
      headers: authHeader(),
    });
  };
  //add issue movies
  postAddMovieIssue = (issue) => {
    return axios.post(API_URL + "addNewIssueMovie", issue, {
      headers: authHeader(),
    });
  };
  //extend issue both book and movie
  getExtendIssue = (issueId) => {
    return axios.get(API_URL + "extendIssue/" + issueId, {
      headers: authHeader(),
    });
  };
  getReturnIssued = (issueId) => {
    return axios.get(API_URL + "returnAllIssues/" + issueId, {
      headers: authHeader(),
    });
  };
  getReturnABook = (issuedBookId) => {
    return axios.get(API_URL + "returnABook/" + issuedBookId, {
      headers: authHeader(),
    });
  };
  //return a movie
  getReturnAMovie = (issuedMovieId) => {
    return axios.get(API_URL + "returnAMovie/" + issuedMovieId, {
      headers: authHeader(),
    });
  };
  getViewMyIssuesListNR = () => {
    return axios.get(API_URL + "viewMyIssues/", { headers: authHeader() });
  };
  // returned Issues (Completed issues)
  getViewMyIssuesListR = () => {
    return axios.get(API_URL + "viewMyReturnedIssues/", {
      headers: authHeader(),
    });
  };

  getViewSingleIssuedNR = (issueId) => {
    return axios.get(API_URL + "viewIssued/" + issueId, {
      headers: authHeader(),
    });
  };
  //returned issued books.
  getViewSingleIssuedR = (issueId) => {
    return axios.get(API_URL + "viewReturnedIssued/" + issueId, {
      headers: authHeader(),
    });
  };

  //check if is books or
  getCheckIsBooks = (issueId) => {
    return axios.get(API_URL + "isBooks/" + issueId, { headers: authHeader() });
  };

  //admin
  adminViewReturned=()=>{
    return axios.get(API_URL + "viewIssuesR",{headers:authHeader()});
  };
  adminViewNotReturned=()=>{
    return axios.get(API_URL + "viewIssuesNR",{headers:authHeader()});
  };
}


export default new IssueService();