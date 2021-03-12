import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {register } from "../redux/actions/authActions"
import {useForm} from "../hooks/useForm"



const Signup = () => {

  const dispatch = useDispatch();

  const handleSignup = () => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password
    };
    dispatch(register(newUser));
    setValues({ name: "", email: "", password: "" });
  };

  const {
    values,
    setValues,
    onChange,
    isLoading,

    isAuthenticated,
    handleSubmit
  } = useForm(handleSignup, { name: "", email: "", password: "" });



  if (!isLoading && isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="mycard">
      <div className="card card-login input-field">
        <h2>Instagram</h2>
        <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={values.name} onChange={onChange} placeholder="Username" />
        <input type="email" name="email" value={values.email} onChange={onChange} placeholder="Email" />
        <input type="password" name="password" value={values.password}  onChange={onChange} placeholder="Password" />
        <button
          className="btn waves-effect waves-light blue darken-1"
          type="submit"
          onClick={handleSubmit}
        >
          Signup
        </button>
        </form>
        
        <h5>
          <Link to="/signin">Already have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
