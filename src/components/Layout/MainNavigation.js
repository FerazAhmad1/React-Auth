import React, { useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { Context } from "../../store/auth-Context";
const MainNavigation = () => {
  const ctx = useContext(Context);
  const clickHandler = (event) => {
    event.preventDefault();
    ctx.logOut();
    console.log("yes");
  };
  const isLoggedin = ctx.isLoggedin;
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedin && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedin && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedin && (
            <li>
              <button onClick={clickHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
