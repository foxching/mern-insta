import { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Reset from "./pages/Reset";
import { PublicRoute } from "./components/routes/PublicRoute";
import { PrivateRoute } from "./components/routes/PrivateRoute";

import store from "./redux/store";
import { loadUser } from "./redux/actions/authActions";

import "./App.css";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PublicRoute path="/signin" component={Login} />
          <PublicRoute path="/reset" component={Reset} />
          <PublicRoute path="/signup" component={Signup} />
          <PrivateRoute path="/profile/:username" component={Profile} />
          <PrivateRoute path="/create" component={CreatePost} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
