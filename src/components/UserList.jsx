import React from "react";
import UserService from "../services/user.service"

class UserList extends React.Component{
constructor(props){
    super(props);
    this.state={
        users:[],
    };
    
}
componentDidMount(){
    UserService.getAllUsers().then((res)=>{
        this.setState({users:res.data});console.log({users:res.data});
    });
};


render(){
    return (
      <div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Image</th>
              <th>Is-Blacklisted</th>
            </tr>
          </thead>

          <tbody>
            {this.state.users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.dob}</td>
                <td>
                  <img
                    src={user.image}
                    style={{ width: "80px", borderRadius: "50%" }}
                  />
                </td>
                <td>{`${user.blacklisted}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
}
export default UserList;

