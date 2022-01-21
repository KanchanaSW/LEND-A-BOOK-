import React, { Component } from "react";
import userService from "../services/user.service";
import Swal from "sweetalert2";

class FogotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    var key = event.target.name;
    var value = event.target.value;
    var obj = {};
    obj[key] = value;
    this.setState(obj);
  }

  sendOTP = (e) => {
    e.preventDefault();
    console.log(this.state.email);
      userService.requestPasswordChangPOST(this.state.email).then((response)=>{
      console.log(response.data);
        //this.props.history.push("/profile");
        if (response.data === "success") {
          Swal.fire({
            title: "OTP send success!",
            text: "enter the valid otp",
            type: "success",
            icon: "success",
          }).then(
            this.props.history.push("/validateOTP"),
          );
        } else {
          console.log(response.statusText);
        }
      }).catch((error)=>{
    console.log(error);
        if (error.response.data === "error") {
          Swal.fire({
           title: "OTP send faild!",
            text: " Failed!",
            type: "error",
            icon: "warning",
          }).then(function () {
            console.log("Error : updated failed");
          });
        } else {
          Swal.fire({
            title: "Network Failed",
            text: "Updated Failed!",
            type: "error",
            icon: "warning",
          }).then(function () {
            console.log("Error : error");
          });
        }
      }) 
  };

  render() {
    return (
      <div>
        <div class="container">
          <div class="card" style={{ width: "450px" }}>
            <div class="card-body">
              <h4 class="card-title">Forgot Password</h4>
              <div class="form-group">
                <label for="email">Email Address:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="testEmailAddress@gmail.com"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <br></br>
              <button onClick={this.sendOTP} class="btn btn-primary">
                SendOTP
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FogotPassword;
