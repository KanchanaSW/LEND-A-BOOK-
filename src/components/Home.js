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
        <br></br>
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; LEND-A-BOOK</h3>
        <br></br>
      </header>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-2">
            <img
              src="https://books.google.com/books/content/images/frontcover/aVPNxmllbAUC?fife=w200-h300"
              className="img1"
              alt=""
            />
          </div>
          <div class="col-sm-2">
            <img
              src="https://res.cloudinary.com/kanchana123/image/upload/v1640866446/books_cover/opovnzdjkaylmicngtrf.jpg"
              className="img1"
              alt=""
            />
          </div>
          <div class="col-sm-2">
            <img
              src="https://books.google.com/books/publisher/content/images/frontcover/plJGEAAAQBAJ?fife=w200-h300"
              className="img1"
              alt=""
            />
          </div>
          <div class="col-sm-2">
            <img
              src="https://res.cloudinary.com/kanchana123/image/upload/v1637387537/movies_cover/knkkn9tc0tlxtzncchlf.jpg"
              className="img1"
              alt=""
            />
          </div>
          <div class="col-sm-2">
            <img
              src="https://res.cloudinary.com/kanchana123/image/upload/v1640780308/movies_cover/h1nalcnusjzvotbkmxbk.jpg"
              className="img1"
              alt=""
            />
          </div>
          <div class="col-sm-2">
            <img
              src="https://play-lh.googleusercontent.com/gocj109XCog0RsHuBAxN1QeAcsAtPwwZwCF3mv3jqGSDcHWAcQkEtJES-PwmxATe1wo6Ng=w200-h300-rw"
              className="img1"
              alt=""
            />
          </div>
        </div>
      </div>
      <br></br>
      <p>
        LEND A BOOK is a book and movie rental web platform substitute for a
        library. This website provides various facilities, for example reserving
        books and movies, renting books and movies, previewing books and movies,
        etc. LEND A BOOK consists of various subscription s to pick from free to
        platinum. Each subscription has its own perks. User is provided a free
        subscription upon registration. User will be able to upgrade the account
        at any time after necessary payments.
      </p>
    </div>
  );
};

export default Home;
