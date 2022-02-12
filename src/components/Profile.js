import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <div class="card border-dark mb-3" style={{ width: "18rem;" }}>
        <div class="card-header">
          HELLO : <strong>{currentUser.fullname}</strong>
        </div>
        <div class="card-body text-dark">
          <h5 class="card-title"> {currentUser.email}</h5>
          <h5>
            Subscription :<strong>--{currentUser.subType}--</strong>
          </h5>
          <h5>{currentUser.roles}</h5>
          <p class="card-text">
            User profile 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
