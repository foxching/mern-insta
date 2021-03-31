import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { logout } from "../../redux/actions/authActions";

const DropMenu = ({ children }) => {
  const drop1 = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const options = {
      onOpenStart: () => {
        console.log("onOpenStart");
      },
      onOpenEnd: () => {
        console.log("onOpenEnd");
      },
      onCloseStart: () => {
        console.log("onCloseStart");
      },
      onCloseEnd: () => {
        console.log("onCloseEnd");
      },
      inDuration: 300,
      outDuration: 200,
      coverTrigger: true
    };
    M.Dropdown.init(drop1.current, options);
  }, []);

  return (
    <div>
      <button
        ref={drop1}
        style={{
          marginTop: "10px",
          marginRight: "15px"
        }}
        className="dropdown-trigger waves-effect  btn-flat button"
        data-target="dropdown1"
      >
        {children}
      </button>

      <ul id="dropdown1" className="dropdown-content">
        <li>
          <Link to={`/profile/${user !== null && user.name}`}>
            <i className="material-icons">account_circle</i>Profile
          </Link>
        </li>
        <li>
          <Link>
            <i className="material-icons">turned_in_not</i>Saved
          </Link>
        </li>
        <li>
          <Link>
            <i className="material-icons">settings_applications</i>Settings
          </Link>
        </li>
        <li>
          <Link>
            <i className="material-icons">sync</i>Switch Account
          </Link>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <a href="#!" onClick={() => dispatch(logout())}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropMenu;
