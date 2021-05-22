import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import Auth from "../pages/Auth";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import NotFound2 from "../pages/NotFound2";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <PublicRoute exact path="/" component={Auth} />
          <PublicRoute path="/signin" component={Login} />
          <PublicRoute path="/register" component={Register} />
          {/* <PublicRoute path="*" component={NotFound} /> */}
          <Route component={authenticatedRoutes} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export const authenticatedRoutes = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute path="*" component={NotFound2} />
      </Switch>
    </div>
  );
};
