import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const [showDropdown, setShowDropdown] = useState(false);

  // const { data } = useFetch(`/users/${user._id}`);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const navigate = useNavigate();

  const register = () => {
    navigate("/register");
  };

  // const Update = () => {
  //   navigate(`/updateuser/${user._id}`);
  // };

  const login = () => {
    navigate("/login");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking.com</span>
        </Link>
        {user ? (
          <div className="dropdownContainer">
            <button className="username" onClick={toggleDropdown}>
              {user.username}
            </button>
            {showDropdown && (
              <div className="dropdown">
                {/* <button className="dropdownButton" onClick={Update}>
                  Update user
                </button> */}
                <button className="dropdownButton" onClick={handleClick}>
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={register}>
              Register
            </button>
            <button className="navButton" onClick={login}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
