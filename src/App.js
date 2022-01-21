import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Update from "./components/UpdateUser";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";

import UserList from "./components/UserList";
import Subscription from "./components/Subscription";
import UpdateSubs from "./components/UpdateSubs";

import BookList from "./components/BookList";
import ViewBook from "./components/ViewBook";
import AddBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";

import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import UpdateMovie from "./components/UpdateMovie";
import ViewMovie from "./components/ViewMovie";

import IssueList from "./components/IssueList";
import ViewIssue from "./components/ViewIssue";
import ViewIssueMovie from "./components/ViewIssueMovie";
import IssueBook from "./components/IssueBook";
import IssueMovie from "./components/IssueMovie";

import ScrapeBooks from "./components/Scrape/ScrapeBooks";
import ScrapeMovies from "./components/Scrape/ScrapeMovies";

import ApiBooksSearch from "./components/API-Intergration/apiBooksSearch";
import ApiMoviesSearch from "./components/API-Intergration/apiMoviesSearch";

import CSVBooks from "./components/CSV/CSVBooks";
import CSVAddBook from "./components/CSV/CSVAddBook";
import CSVUpdateBook from "./components/CSV/CSVUpdateBook";

import CSVMovies from "./components/CSV/CSVMovies";
import CSVAddMovie from "./components/CSV/CSVAddMovie";
import CSVUpdateMovie from "./components/CSV/CSVUpdateMovie";

import ExBookSearch from "./components/DB-Integration/exBookSearch";
import ExMovieSearch from "./components/DB-Integration/exMovieSearch";
import FogotPassword from "./components/FogotPassword";
import ValidateOTP from "./components/ValidateOTP";
import ResetPassword from "./components/ResetPassword";

import { NavDropdown } from "react-bootstrap";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showUserBoard, setShowUserBoard] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user); //gusest
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowUserBoard(user.roles.includes("ROLE_USER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            Lend A Book
          </Link>
          <div className="collapse navbar-collapse">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {showUserBoard && (
                <>
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      User
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/subscription"} className="nav-link">
                      Subscription
                    </Link>
                  </li>
                </>
              )}

              {showAdminBoard + showUserBoard && (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link to={"/updateUser"} className="nav-link">
                      Account
                    </Link>
                  </li>
                  <>
                    <NavDropdown
                      title="Content"
                      id="nav-dropdown-dark-example"
                      menuVariant="dark"
                    >
                      <NavDropdown.Item>
                        <Link to={"/bookList"} className="nav-link">
                          Books-List
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to={"/movieList"} className="nav-link">
                          Movies-List
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                    {/* Issues functions */}
                    <NavDropdown
                      title="Issue"
                      id="nav-dropdown-dark-example"
                      menuVariant="dark"
                    >
                      <NavDropdown.Item>
                        <Link to={"/issueBook"} className="nav-link">
                          Issue-Book
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to={"/issueMovie"} className="nav-link">
                          Issue-Movie
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to={"/issueList"} className="nav-link">
                          Issues-List
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                  {/*     Integrations */}
                  <NavDropdown
                    title="Integrations"
                    id="nav-dropdown-dark-example"
                    menuVariant="dark"
                  >
                    <NavDropdown.Item>
                      <Link to={"/scrapeBooks"} className="nav-link">
                        Competitors-Books
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to={"/scrapeMovies"} className="nav-link">
                        Competitors-Movies
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to={"/apiBooksSearch"} className="nav-link">
                        API-Books
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to={"/apiMoviesSearch"} className="nav-link">
                        API-Movies
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to={"/csvBooks"} className="nav-link">
                        CSV-Books
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to={"/csvMovies"} className="nav-link">
                        CSV-Movies
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to={"/exDBBookSearch"} className="nav-link">
                        External DB Books
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to={"/exDBMovieSearch"} className="nav-link">
                        External DB Movies
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </ul>
          </div>

          {currentUser ? (
            <div className="navbar-nav">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.email}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/updateUser" component={Update} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/admin" component={BoardAdmin} />

          <Route path="/userList" component={UserList} />
          <Route exact path="/subscription" component={Subscription} />
          <Route path="/updateSubs/:subscriptionId" component={UpdateSubs} />

          <Route path="/bookList" component={BookList} />
          <Route path="/book/:id" component={ViewBook} />
          <Route path="/addBook" component={AddBook} />
          <Route path="/updateBook/:id" component={UpdateBook} />

          <Route path="/movieList" component={MovieList} />
          <Route path="/addMovie" component={AddMovie} />
          <Route path="/updateMovie/:movieId" component={UpdateMovie} />
          <Route path="/movie/:movieId" component={ViewMovie} />

          <Route path="/issueList" component={IssueList} />
          <Route path="/issueNR/:issueId" component={ViewIssue} />
          <Route path="/issueNRmovie/:issueId" component={ViewIssueMovie} />
          <Route path="/issueBook" component={IssueBook} />
          <Route path="/issueMovie" component={IssueMovie} />

          <Route path="/scrapeBooks" component={ScrapeBooks} />
          <Route path="/scrapeMovies" component={ScrapeMovies} />

          <Route path="/apiBooksSearch" component={ApiBooksSearch} />
          <Route path="/apiMoviesSearch" component={ApiMoviesSearch} />

          <Route path="/csvBooks" component={CSVBooks} />
          <Route path="/csvAddBook/:id" component={CSVAddBook} />
          <Route path="/csvUpdateBook/:id" component={CSVUpdateBook} />

          <Route path="/csvMovies" component={CSVMovies} />
          <Route path="/csvAddMovie/:id" component={CSVAddMovie} />
          <Route path="/csvUpdateMovie/:id" component={CSVUpdateMovie} />

          <Route path="/exDBBookSearch" component={ExBookSearch} />
          <Route path="/exDBMovieSearch" component={ExMovieSearch} />
          <Route path="/fogotPassword" component={FogotPassword} />
          <Route path="/validateOTP" component={ValidateOTP} />
          <Route path="/resetPassword/:otp" component={ResetPassword} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
