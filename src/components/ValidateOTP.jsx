import React, { Component } from "react";
import userService from "../services/user.service";
import Swal from "sweetalert2";

class ValidateOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendOTP = this.sendOTP.bind(this);
  }

  handleInputChange(event) {
    var key = event.target.name;
    var value = event.target.value;
    var obj = {};
    obj[key] = value;
    this.setState(obj);
  }
  sendOTP(otp) {
    this.props.history.push(`/resetPassword/${otp}`);
  }

  validateOTP = (e) => {
    e.preventDefault();
    console.log(this.state.otp);
    var otp = Number(this.state.otp);
    console.log(otp);
    userService
      .validCheckOtpPOST(otp)
      .then((response) => {
        console.log(response.data);
        //this.props.history.push("/profile");
        if (response.data === "success") {
          Swal.fire({
            title: "OTP is valid!",
            text: "now reset the password",
            type: "success",
            icon: "success",
          }).then(this.sendOTP(otp));
        } else {
          console.log(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === "expired") {
          Swal.fire({
            title: "OTP is expired!",
            text: " Generate new!",
            type: "error",
            icon: "warning",
          }).then(this.props.history.push("/fogotPassword"));
        } else if (error.response.data === "error") {
          Swal.fire({
            title: "OTP error!",
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
      });
  };

  render() {
    return (
      <div>
        <div class="container">
          <div class="card" style={{ width: "450px" }}>
            <div class="card-body">
              <h4 class="card-title">Validate OTP</h4>
              <div class="form-group">
                <label for="email">OTP NUMBER:</label>
                <input
                  type="number"
                  className="form-control"
                  id="otp"
                  placeholder="1234"
                  name="otp"
                  value={this.state.otp}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <br></br>
              <button onClick={this.validateOTP} class="btn btn-primary">
                Validate-OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ValidateOTP;
