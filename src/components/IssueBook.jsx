import React from "react";
import ReserveService from "../services/reserve.service";

class IssueBook extends React.Component{
    constructor(props){
        super(props);
        this.state={
           reserveTemp:[], 
        };
    }
    componentDidMount(){
        ReserveService.getUserReserversList().then((res)=>{
            this.setState({reserveTemp:res.data});
        })
    }
    render(){
        return (
          <div>
            <h3>Reserves</h3>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Reserve-Id</th>
                  <th>BookId</th>
                </tr>
              </thead>

              <tbody>
                {this.state.reserveTemp.map((rt) => (
                  <tr key={rt.issueId}>
                    <td>{rt.reserveId}</td>
                    <td>{rt.bookId}</td>
                   
                 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
}
export default IssueBook;