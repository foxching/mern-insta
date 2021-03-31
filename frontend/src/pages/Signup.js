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
    loading,
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
            <button className="btn btn-flat grey lighten-3">
              <i className="large material-icons">add_a_photo</i>
              <input type="file" onChange={e => setImage(e.target.files[0])} />
            </button>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="Upload Profile Photo.."
              />
            </div>
          </div>
          <button
            className="btn waves-effect waves-light blue darken-1"
            type="submit"
            onClick={handleSubmit}
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
              "Signup"
            )}
          </button>
        </form>

        <h6>
          Already have an account?
          <span>
            <Link to="/signin" className="blue-text text-darken-3">
              Signin
            </Link>
          </span>
        </h6>
      </div>
    </div>
  );
};

export default Signup;
