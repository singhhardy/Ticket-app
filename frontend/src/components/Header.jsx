import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    Navigate('/')
  }

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <button className="btn" onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </button>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> LogIn
              </Link>
            </li>
            <li>
              <Link to="/Register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
