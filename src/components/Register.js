import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob,setDob]=useState("");
  const [signupDate,setSignupDate]=useState("");
  const [image,setImage]=useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeFullname = (e) => {
    const fullname = e.target.value;
    setFullname(fullname);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

const onChangeDob = (e) => {
  const dob = e.target.value;
  setDob(dob);
};
const onChangeSignupDate = (e) => {
  const signupDate = e.target.value;
  setSignupDate(signupDate);
};
const onChangeImage = (e) => {
  const image = e.target.value;
  setImage(image);
};

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(email, password, fullname,dob,signupDate,image).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="fullname">Fullname</label>
                <Input
                  type="text"
                  className="form-control"
                  name="fullname"
                  value={fullname}
                  onChange={onChangeFullname}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date-Of-Birth</label>
                <Input
                  type="text"
                  className="form-control"
                  name="dob"
                  value={dob}
                  onChange={onChangeDob}
                />
              </div>

              <div className="form-group">
                <label htmlFor="signupDate">Signup Date</label>
                <Input
                  type="text"
                  className="form-control"
                  name="signupDate"
                  value={signupDate}
                  onChange={onChangeSignupDate}
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Image</label>
                <Input
                  type="text"
                  className="form-control"
                  name="image"
                  value={image}
                  onChange={onChangeImage}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};
export default Register;
