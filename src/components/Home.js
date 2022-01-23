import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>LEND-A-BOOK</h3>
      </header>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        vestibulum orci a sapien imperdiet maximus. Suspendisse vel ex eget
        mauris efficitur finibus eu a enim. Aenean tellus neque, consectetur sit
        amet lacus a, hendrerit ornare urna. Fusce venenatis lorem vitae augue
        suscipit, eu tempor massa vulputate. Praesent iaculis velit libero, vel
        faucibus sem pulvinar vel. Curabitur viverra nisl dui, a venenatis felis
        pellentesque id. Donec non lacus diam. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nullam vestibulum orci a sapien imperdiet
        maximus. Suspendisse vel ex eget mauris efficitur finibus eu a enim.
        Aenean tellus neque, consectetur sit amet lacus a, hendrerit ornare
        urna. Fusce venenatis lorem vitae augue suscipit, eu tempor massa
        vulputate. Praesent iaculis velit libero, vel faucibus sem pulvinar vel.
        Curabitur viverra nisl dui, a venenatis felis pellentesque id. Donec non
        lacus diam. Donec non lacus diam. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nullam vestibulum orci a sapien imperdiet
        maximus. Suspendisse vel ex eget mauris efficitur finibus eu a enim.
        Aenean tellus neque, consectetur sit amet lacus a, hendrerit ornare
        urna. Fusce venenatis lorem vitae augue suscipit, eu tempor massa
        vulputate. Praesent iaculis velit libero, vel faucibus sem pulvinar vel.
        Curabitur viverra nisl dui, a venenatis felis pellentesque id. Donec non
        lacus diam.
      </p>
    </div>
  );
};

export default Home;
