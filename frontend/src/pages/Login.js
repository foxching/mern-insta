import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import { useForm } from "../hooks/useForm";

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
    loading,
    isAuthenticated,
    handleSubmit
  } = useForm(handleSignin, { email: "", password: "" });

  if (!isLoading && isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="mycard">
      <div className="card card-login input-field">
        <h2>Instagram</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={onChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={onChange}
            placeholder="Password"
          />
          <button
            className="btn waves-effect waves-light blue lighten-1"
            type="submit"
            disabled={loading}
            style={{ width: "100%", marginTop: "10px", textTransform: "none" }}
          >
            {loading ? (
              <div className="preloader-wrapper small active">
                <div className="spinner-layer spinner-red-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div>
                  <div className="gap-patch">
                    <div className="circle"></div>
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <h6>
          Dont have an account?
          <span>
            <Link to="/signup" className="blue-text text-darken-3">
              Signup
            </Link>
          </span>
        </h6>
        <small>
          <Link to="/reset" className="blue-text text-darken-3">
            Forgot password ?
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Login;
