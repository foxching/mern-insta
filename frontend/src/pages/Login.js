import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="mycard">
      <div className="card card-login input-field">
        <h2>Instagram</h2>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button class="btn waves-effect waves-light blue lighten-2" type="submit" >
          Login
        </button>
        <h5>
          <Link to="/signup">Dont have an account ?</Link>
        </h5>
        <h6>
          <Link to="/reset">Forgot password ?</Link>
        </h6>
      </div>
    </div>
  )
};

export default Login;
