import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../redux/actions/authActions";
import { useForm } from "../hooks/useForm";

const Signup = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  const handleSignup = () => {
    if (image) {
      uploadPic();
    } else {
      handleRegister();
    }
  };

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "dtvqrqyqr");
    fetch("https://api.cloudinary.com/v1_1/dtvqrqyqr/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url);
        console.log(data.url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleRegister = () => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
      pic: url
    };

    dispatch(register(newUser));
    setValues({ name: "", email: "", password: "" });
  };

  useEffect(() => {
    if (url) {
      handleRegister();
    }
    // eslint-disable-next-line
  }, [url]);

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
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={onChange}
            placeholder="Username"
          />
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
          <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
              <span>Upload pic</span>
              <input type="file" onChange={e => setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
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
