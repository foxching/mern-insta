import {useEffect} from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";

import store from "./redux/store";
import { loadUser } from './redux/actions/authActions'

import "./App.css";

const App = () => {
  
  useEffect(() => {
    store.dispatch(loadUser())
  },[])
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route path="/create" component={CreatePost} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
