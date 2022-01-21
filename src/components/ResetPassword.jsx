import React from "react";
import userService from "../services/user.service";
import Swal from "sweetalert2";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: this.props.match.params.otp,
      pass1: "",
      pass2: "",
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

  resetPass = (e) => {
    e.preventDefault();
    console.log(this.state.pass2);
    console.log(this.state.pass1);
    console.log(this.state.otp);
    if (this.state.pass1 !== this.state.pass2) {
      Swal.fire({
        title: "passwords dont match",
        text: " enter matching passwords!",
        type: "error",
        icon: "warning",
      }).then(function () {
        //   window.location.reload(false);
        console.log("Error : paswords mssmatch");
      });
    } else {
      userService
        .retsetPasswordPOST(this.state.otp, this.state.pass2)
        .then((response) => {
          console.log(response.data);
          //this.props.history.push("/profile");
          if (response.data === "success") {
            Swal.fire({
              title: "password reset success!",
              text: "login now",
              type: "success",
              icon: "success",
            }).then(this.props.history.push("/login"));
          } else {
            //    window.location.reload(false);
            console.log(response.statusText);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data === "error") {
            Swal.fire({
              title: "password reset error",
              text: " Failed!",
              type: "error",
              icon: "warning",
            }).then(function () {
              //  window.location.reload(false);
              console.log("Error : updated failed");
            });
          } else {
            Swal.fire({
              title: "Network Failed",
              text: "Updated Failed!",
              type: "error",
              icon: "warning",
            }).then(function () {
              //  window.location.reload(false);
              console.log("Error : error");
            });
          }
        });
    }
  };

  render() {
    return (
      <div>
        <div class="container">
          <div class="card" style={{ width: "450px" }}>
            <div class="card-body">
              <h4 class="card-title">Reset Password</h4>
              <div class="form-group">
                <label for="email">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="pass1"
                  placeholder="abc123!@#"
                  name="pass1"
                  value={this.state.pass1}
                  onChange={this.handleInputChange}
                  required
                  maxLength={10}
                />
              </div>
              <div class="form-group">
                <label for="email">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="pass2"
                  placeholder="abc123!@#"
                  name="pass2"
                  value={this.state.pass2}
                  onChange={this.handleInputChange}
                  required
                  maxLength={10}
                />
              </div>
              <br></br>
              <button onClick={this.resetPass} class="btn btn-primary">
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetPassword;
