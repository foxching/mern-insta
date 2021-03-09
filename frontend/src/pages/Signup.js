import { Link } from "react-router-dom"


const Signup = () => {
  return (
    <div className="mycard">
      <div className="card card-login input-field">
        <h2>Instagram</h2>
        <input type="text" name="name" placeholder="Username" />
        <input type="email" name="email" placeholder="Email" />
        <input type="text" name="password" placeholder="Password" />
        <button class="btn waves-effect waves-light blue lighten-2" type="submit" >
          Signup
        </button>
        <h5>
          <Link to="/signin">Already have an account ?</Link>
        </h5>
      </div>
    </div>
  )
};

export default Signup;
