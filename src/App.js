import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import BoardBronze from "./components/BoardBronze";
import BoardSilver from "./components/BoardSilver";
import BoardGold from "./components/BoardGold";
import BoardPlatinum from "./components/BoardPlatinum";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showBronzeBoard,setShowABronzeBoard]=useState(false);
  const [showSilverBoard,setShowASilverBoard]=useState(false);
  const [showGoldBoard,setShowAGoldBoard]=useState(false);
  const [showPlatinmBoard,setShowAPlatinmBoard]=useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowABronzeBoard(user.roles.includes("ROLE_BRONZE"));
      setShowASilverBoard(user.roles.includes("ROLE_SILVER"));
      setShowAGoldBoard(user.roles.includes("ROLE_GOLD"));
      setShowAPlatinmBoard(user.roles.includes("ROLE_PLATINUM"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Lend A Book
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {showBronzeBoard && (
            <li className="nav-item">
              <Link to={"/bronze"} className="nav-link">
                Bronze Board
              </Link>
            </li>
          )}

          {showSilverBoard && (
            <li className="nav-item">
              <Link to={"/silver"} className="nav-link">
                Silver Board
              </Link>
            </li>
          )}

          {showGoldBoard && (
            <li className="nav-item">
              <Link to={"/gold"} className="nav-link">
                Gold Board
              </Link>
            </li>
          )}

          {showPlatinmBoard && (
            <li className="nav-item">
              <Link to={"/platinum"} className="nav-link">
                Platinum Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
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
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/bronze" component={BoardBronze} />
          <Route path="/silver" component={BoardSilver} />
          <Route path="/gold" component={BoardGold} />
          <Route path="/platinum" component={BoardPlatinum} />

        </Switch>
      </div>
    </div>
  );
};

export default App;
