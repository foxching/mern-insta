import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import inst_image from "../images/9364675fb26a.svg";
import insta_logo from "../images/logoinsta.png";
import fb from "../images/fb.png";
import appstore from "../images/app.png";
import playstore from "../images/play.png";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import "../styles/Auth.scss";

const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleChange = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <div className="loginpage_main">
            <div>
              <img src={inst_image} width="454px" alt="sideImage" />
            </div>
            <div>
              <div className="loginpage_rightcomponent">
                <img src={insta_logo} className="loginpage_logo" alt="logo" />
                <div className="loginpage_signin">
                  {isLoggedIn ? <SignIn /> : <SignUp />}
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
                {isLoggedIn ? (
                  <div className="loginpage_signin">
                    Dont have an account?
                    <span
                      onClick={handleChange}
                      style={{ fontWeight: "bold", color: "#0395F6" }}
                    >
                      Signup
                    </span>
                  </div>
                ) : (
                  <div className="loginpage__signup">
                    Have an account ?{" "}
                    <span
                      onClick={handleChange}
                      style={{ fontWeight: "bold", color: "#0395F6" }}
                    >
                      Signin
                    </span>
                  </div>
                )}
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
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
};

export default Auth;
