import { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/actions/authActions";
import Navigation from "./components/Navigation/Navigation";
import PublicRoute from "./components/routes/PublicRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./styles/App.scss";

const App = () => {
  const login = localStorage.getItem("login");
  useEffect(() => {
    if (login) {
      store.dispatch(loadUser());
    }
  }, [login]);
  return (
    <Provider store={store}>
      <BrowserRouter>
        {login && <Navigation />}
        <Switch>
          <PublicRoute exact path="/" component={login ? Home : Auth} />
          <PublicRoute path="/signin" component={Login} />
          <PublicRoute path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
