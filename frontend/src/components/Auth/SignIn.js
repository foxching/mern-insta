import React from "react";
import "../../styles/login.scss";

const SignIn = () => {
  return (
    <form>
      <input
        type="text"
        className="login_text"
        placeholder="Enter username or email"
      />
      <input
        type="password"
        className="login_text"
        placeholder="Enter password"
      />
      <button className="login_button">Login</button>
    </form>
  );
};

export default SignIn;
