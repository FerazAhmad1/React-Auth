import { useContext, useRef, useState } from "react";

import classes from "./AuthForm.module.css";

import { Context } from "../../store/auth-Context";

const AuthForm = () => {
  const ctx = useContext(Context);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enterEmail = emailInputRef.current.value;
    const enterPassword = passwordInputRef.current.value;
    const user = {
      email: enterEmail,
      password: enterPassword,
      returnSecureToken: true,
    };

    if (isLogin) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJrVA_6eOyyyRBMhwaXyDi6FK0KoGlfGI",
          {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log(data.idToken);
          ctx.login(data.idToken);
          // ctx.isLoggedin = true;
        }

        console.log(data);
        if (data.error) throw data.error;
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJrVA_6eOyyyRBMhwaXyDi6FK0KoGlfGI",
          {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          // do some thing
        }
        if (data.error) throw data.error;
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
