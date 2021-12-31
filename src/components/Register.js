import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ fontSize: "12px" }}
      >
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ fontSize: "12px" }}
      >
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ fontSize: "12px" }}
      >
        must contain max 6 chars.
      </div>
    );
  }
};
const similar = (value) => {
  if (vpassword != value.value) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ fontSize: "12px" }}
      >
        Passwords dont match.
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
  const [rePassword, setRePassword] = useState("");
  const [dob, setDob] = useState("");
  const [dob2, setDob2] = useState("");
  const [image, setImage] = useState("");
  const [pic, setPic] = useState("//ssl.gstatic.com/accounts/ui/avatar_2x.png");
  const [loading, setLoading] = useState(false);
  const [isBlacklisted, setBlacklisted] = useState("");
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
  const onChangeRePassword = (e) => {
    const rePassword = e.target.value;
    setRePassword(rePassword);
  };
  const onChangeDob2 = (e) => {
    const dob2 = e.target.value;
    setDob2(dob2);
    setDob(dob2);
  };

  const onChangeDob = (e) => {
    const dob = e.target.value;
    setDob(dob);
  };
  const onChangeImage = (e) => {
    const image = e.target.value;
    setImage(image);
  };
  const onChangeBlacklisted = (e) => {
    const isBlacklisted = e.target.value;
    setBlacklisted(isBlacklisted);
  };
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "profile_pics");
    setLoading(true);
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/kanchana123/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    setPic(file.secure_url);
    setImage(file.secure_url);
    setLoading(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(
        email,
        password,
        fullname,
        dob,
        image,
        isBlacklisted
      ).then(
        (response) => {
          setMessage(response.data.message);
          console.log(dob);
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
    <div className="card card-container2">
      <h3>Register User</h3>
      <div className="row">
        <div className="col-md-4" style={{ marginTop: "25px" }}>
          {loading ? (
            <h6>Loading...</h6>
          ) : (
            <img src={pic} alt="profile-img" className="profile-img-card" />
          )}

          <input
            type="file"
            name="file"
            onChange={uploadImage}
            style={{ color: "#f7f7f7", marginLeft: "57px" }}
          />
        </div>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="row">
                <div className="col-sm1">
                  <label htmlFor="fullname">Fullname</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="fullname"
                    value={fullname}
                    onChange={onChangeFullname}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm1">
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
              </div>
              <div className="row">
                <div className="col-sm">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="col-sm">
                  <label htmlFor="rePassword">Repeat Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="rePassword"
                    value={rePassword}
                    onChange={onChangeRePassword}
                    id="rePassword"
                    validations={[required, similar]}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm1">
                  <label htmlFor="dob">Date-Of-Birth</label>
                  <input
                    type="date"
                    value={dob2}
                    onChange={onChangeDob2}
                    name="dob2"
                  />
                  <Input
                    type="hidden"
                    className="form-control"
                    name="dob"
                    value={dob}
                    onChange={onChangeDob}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm1">
                  <Input
                    type="hidden"
                    className="form-control"
                    name="isBlaclisted"
                    value={false}
                    onChange={onChangeBlacklisted}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm1">
                  <Input
                    type="hidden"
                    className="form-control"
                    name="image"
                    value={image}
                    onChange={onChangeImage}
                  />
                </div>
              </div>
              <br />

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
