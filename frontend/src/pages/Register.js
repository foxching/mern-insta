import React from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import insta_logo from "../images/logoinsta.png";
import fb from "../images/fb.png";
import appstore from "../images/app.png";
import playstore from "../images/play.png";
import SignUp from "../components/Auth/SignUp";

import "../styles/Auth.scss";

const Login = () => {
  const history = useHistory();

  const handleRoute = () => {
    history.push("/signin");
  };

  return (
    <Grid container justify="center">
      <div className="loginpage_main">
        <div>
          <div className="loginpage_rightcomponent">
            <img src={insta_logo} className="loginpage_logo" alt="logo" />
            <div className="loginpage_signin">
              <SignUp />
            </div>
            <div className="login_ordiv">
              <div className="login_divider"></div>
              <div className="login_or">OR</div>
              <div className="login_divider"></div>
            </div>
            <div className="login_fb">
              {" "}
              <img
                src={fb}
                width="15px"
                style={{ marginRight: "5px" }}
                alt="fb-logo"
              />
              Login with Facebook
            </div>
            <div className="login_forgt">Forgot Password?</div>
          </div>

          <div className="loginpage_signupoption">
            <div className="loginpage__signup">
              Have an account ?{" "}
              <span
                style={{ fontWeight: "bold", color: "#0395F6" }}
                onClick={handleRoute}
              >
                Signin
              </span>
            </div>
          </div>

          <div className="loginpage_downloadSection">
            <div>Get the app.</div>
            <div className="loginpage__option">
              <img
                className="loginpage_dwimg"
                src={appstore}
                width="136px"
                alt="appstore"
              />
              <img
                className="loginpage_dwimg"
                src={playstore}
                width="136px"
                alt="playstore"
              />
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default Login;
