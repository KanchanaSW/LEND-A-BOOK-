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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            vestibulum orci a sapien imperdiet maximus. Suspendisse vel ex eget
            mauris efficitur finibus eu a enim. Aenean tellus neque, consectetur
            sit amet lacus a, hendrerit ornare urna. Fusce venenatis lorem vitae
            augue suscipit, eu tempor massa vulputate. Praesent iaculis velit
            libero, vel faucibus sem pulvinar vel. Curabitur viverra nisl dui, a
            venenatis felis pellentesque id. Donec non lacus diam. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Nullam vestibulum orci
            a sapien imperdiet maximus. Suspendisse vel ex eget mauris efficitur
            finibus eu a enim. Aenean tellus neque, consectetur sit amet lacus
            a, hendrerit ornare urna. Fusce venenatis lorem vitae augue
            suscipit, eu tempor massa vulputate. Praesent iaculis velit libero,
            vel faucibus sem pulvinar vel. Curabitur viverra nisl dui, a
            venenatis felis pellentesque id. Donec non lacus diam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
