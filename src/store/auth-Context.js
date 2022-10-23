import React, { useState } from "react";
import { ReactDOM } from "react-dom";

const Context = React.createContext({
  isLoggedin: false,
  token: "",
  login: () => {},
  logOut: () => {},
});

const ContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const userLoggedIn = !!token;
  const loginHandler = (token) => {
    console.log("yes");
    setToken(token);
  };
  const logOutHandler = () => {
    setToken("");
  };

  const contextValue = {
    token: token,
    isLoggedin: userLoggedIn,
    login: loginHandler,
    logOut: logOutHandler,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export { ContextProvider, Context };
