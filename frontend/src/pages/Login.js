import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login } from "../redux/actions/authActions"
import {useForm} from "../hooks/useForm"


const Login = () => {
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
    isLoading,
    isAuthenticated,
    handleSubmit
  } = useForm(handleSignin, {email: "", password: "" });

  if (!isLoading && isAuthenticated) {
    return <Redirect to="/" />;
  }


  return (
    <div className="mycard">
      <div className="card card-login input-field">
        <h2>Instagram</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" value={values.email} onChange={onChange} placeholder="Email" />
          <input type="password" name="password" value={values.password}  onChange={onChange} placeholder="Password" />
          <button
            className="btn waves-effect waves-light blue darken-1"
            type="submit"
          >
            Login
          </button>
        </form>
        
        <h5>
          <Link to="/signup">Dont have an account ?</Link>
        </h5>
        <h6>
          <Link to="/reset">Forgot password ?</Link>
        </h6>
      </div>
    </div>
  );
};

export default Login;
