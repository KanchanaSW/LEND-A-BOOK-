import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/admin/";

class IssueService{
    postAddBookIssue=(issue)=>{
        return axios.post(API_URL + "addNewIssue",issue,{headers:authHeader()});
    };
    putExtendIssueBook=(issue,issueId)=>{
        return axios.put(API_URL + "extendIssue/"+issueId,issue,{headers:authHeader()});
    };
    getReturnIssuedBook=(issueId)=>{
        return axios.get(API_URL + "returnAllBooks/"+issueId,{headers:authHeader()});
    };
    getViewMyIssuesListNR=()=>{
        return axios.get(API_URL + "viewMyIssues",{headers:authHeader()});
    };
}
export default new IssueService();