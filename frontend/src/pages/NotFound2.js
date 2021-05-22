import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function NotFound2() {
  // const { isAuthenticated, isLoading } = useSelector(state => state.auth);
  // if (!isLoading && isAuthenticated) {
  //   return <Redirect to="/" />;
  // }
  return <div>Not Found Authenticated</div>;
}

export default NotFound2;
