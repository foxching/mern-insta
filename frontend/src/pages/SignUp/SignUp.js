import React from "react";
import "./SignUp.css";

const Signup = () => {
  return (
    <form>
      <input type="text" className="signup_text" placeholder="User Name" />
      <input
        type="text"
        className="signup_text"
        placeholder="Mobile Number or email"
      />
      <input
        type="password"
        className="signup_text"
        placeholder="Enter password"
      />
      <button className="signup_button">Signup</button>
    </form>
  );
};

export default Signup;
