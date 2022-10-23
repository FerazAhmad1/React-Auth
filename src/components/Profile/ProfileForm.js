import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import { Context } from "../../store/auth-Context";

const ProfileForm = () => {
  const ctx = useContext(Context);
  const profileInput = useRef();
  const clickHandler = async (event) => {
    console.log("yes");
    event.preventDefault();
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDJrVA_6eOyyyRBMhwaXyDi6FK0KoGlfGI",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
          password: profileInput.current.value,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    const data = await response.json();

    if (response.ok) {
      console.log(data);
    }
  };
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={profileInput} />
      </div>
      <div className={classes.action}>
        <button onClick={clickHandler}>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
