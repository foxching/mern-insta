import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => !!state.auth.token);
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderLinks = () => {
    if (isAuthenticated) {
      return (
        <>
          <li key="1">
            <Link to={`/profile/${user !== null && user.name}`}>Profile</Link>
          </li>
          <li key="2">
            <Link to="/create">Create Post</Link>
          </li>
          <li key="5">
            <button
              className="btn #c62828 red darken-3"
              style={{ marginRight: "10px" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li key="3">
            <Link to="/signin">Login</Link>
          </li>
          <li key="4">
            <Link to="/signup">Signup</Link>
          </li>
        </>
      );
    }
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand-logo left" style={{ marginLeft: "15px" }}>
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {renderLinks()}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
