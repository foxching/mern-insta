import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import DropMenu from "./Modal/DropMenu";

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
          <li>
            <Link to={`/profile/${user !== null && user.name}`}>Profile</Link>
          </li>
          <li>
            <Link to="/create">Create Post</Link>
          </li>
          <li>
            <DropMenu>
              <img
                className="circle"
                src={user !== null ? user.pic : "https://res.cloudinary.com/dtvqrqyqr/image/upload/v1616895042/giphy_tacamn.gif"}
                style={{ width: "2rem", height: "1.9rem" }}
              />
            </DropMenu>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/signin">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <nav>
        <div className="nav-wrapper white">
          <Link
            to="/"
            className="brand-logo left"
            style={{ marginLeft: "15px" }}
          >
            Instagram
          </Link>
          <ul id="nav-mobile" className="right">
            {renderLinks()}
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
