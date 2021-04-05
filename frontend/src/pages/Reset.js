import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/actions/authActions";

const Reset = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector(state => state.ui);
  const [email, setEmail] = useState("");

  return (
    <div className="mycard">
      <div className="card card-login input-field">
        <i
          className="fas fa-lock"
          style={{ fontSize: "40px", color: "#ccc" }}
        ></i>
        <h6 style={{ fontWeight: "600", color: "#000" }}>
          Trouble Logging In?
        </h6>
        <p style={{ textAlign: "justify", fontSize: "12px" }}>
          Enter your email, phone, or username and we'll send you a link to get
          back into your account.
        </p>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          style={{ width: "100%", marginTop: "10px" }}
          onClick={() => dispatch(resetPassword(email, history))}
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
            "send login link"
          )}
        </button>
      </div>
    </div>
  );
};

export default Reset;
