import React from "react";
import UserService from "../services/user.service"

class UserList extends React.Component{
constructor(props){
    super(props);
    this.state={
        users:[],
        name:"",
        empty:"",
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
componentDidMount(){
    UserService.getAllUsers().then((res)=>{
        this.setState({users:res.data});console.log({users:res.data});
    });
};
handleChange(event){
  var value = event.target.value;
  this.setState({name:value});
}
handleSubmit(event){
   event.preventDefault();
     var v = "ALL";
     var z="";
if (this.state.name == "") {
  z=v;
  console.log(z);
}else{
  z=this.state.name;
  console.log(z);
}
  UserService.searchName(z).then((data)=>{
    console.log(data.data);
    if (data.data == 0) {
      var x = "no users found";
      this.setState({empty:x});
      this.setState({users:data.data}) 
      console.log(this.state.empty);     
    }else if(data.data != 0){
      this.setState({empty:""});
      this.setState({users:data.data});
    }
  });
}

render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="card-header main-search">
            <div className="row">
              <div className="col-10">
                <input
                  onChange={this.handleChange}
                  value={this.state.name}
                  className="AutoFocus form-control"
                  placeholder="Type user name title..."
                  type="text"
                />
              </div>
              <div className="col">
                <input
                  type="submit"
                  value="🔍 Search"
                  className="btn btn-primary search-btn"
                />
              </div>
            </div>
          </div>

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
          <span className="empty">{this.state.empty}</span>
        </form>
      </div>
    );
}
}
export default UserList;

