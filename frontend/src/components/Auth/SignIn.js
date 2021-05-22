import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { useForm } from "../../hooks/useForm";
import "../../styles/login.scss";

const SignIn = () => {
  const dispatch = useDispatch();

  const handleSignin = () => {
    const newUser = {
      email: values.email,
      password: values.password
    };
    dispatch(login(newUser));
    setValues({ email: "", password: "" });
  };

  const {
    values,
    setValues,
    onChange,
    loading,

    handleSubmit
  } = useForm(handleSignin, { email: "", password: "" });

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="login_text"
        placeholder="Enter username or email"
        name="email"
        onChange={onChange}
        value={values.email}
      />
      <input
        type="password"
        className="login_text"
        placeholder="Enter password"
        name="password"
        onChange={onChange}
        values={values.password}
      />
      <button className="login_button" disabled={loading}>
        Login
      </button>
    </form>
  );
};

export default SignIn;
