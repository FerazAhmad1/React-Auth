import React, { useEffect, useState } from "react";
import { ReactDOM } from "react-dom";

const Context = React.createContext({
  isLoggedin: false,
  token: "",
  login: () => {},
  logOut: () => {},
});

const ContextProvider = (props) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    loginHandler(localStorage.getItem("token"));
  }, []);
  const userLoggedIn = !!token;
  console.log(userLoggedIn);
  const loginHandler = (token) => {
    console.log("yes");
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logOutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: token,
    isLoggedin: userLoggedIn,
    login: loginHandler,
    logOut: logOutHandler,
  };
  console.log(contextValue);
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export { ContextProvider, Context };
