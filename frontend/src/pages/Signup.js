import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="mycard">
      <div className="card card-login input-field">
        <h2>Instagram</h2>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Username" />
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button
          class="btn waves-effect waves-light blue darken-1"
          type="submit"
        >
          Signup
        </button>
        <h5>
          <Link to="/signin">Already have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
