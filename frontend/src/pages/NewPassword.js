import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../redux/actions/authActions";

const NewPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useParams();

  const { loading } = useSelector(state => state.ui);
  const [userPassword, setUserPassword] = useState({
    password: "",
    confirmPassword: ""
  });

  const handleChange = e => {
    setUserPassword({
      ...userPassword,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdatePassword = () => {
    dispatch(updatePassword(userPassword, token, history));
  };

  return (
    <div className="mycard">
      <div className="card card-login input-field">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userPassword.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={userPassword.confirmPassword}
          onChange={handleChange}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          style={{ width: "100%", marginTop: "10px" }}
          onClick={handleUpdatePassword}
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
            "Update Password"
          )}
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
