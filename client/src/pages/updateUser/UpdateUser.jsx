import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./updateUser.css";
import useFetch from "../../hooks/useFetch";

const UpdateUser = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data } = useFetch(`/users/${id}`);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    country: "",
    city: "",
    phone: "",
  });

  useEffect(() => {
    if (data) {
      setCredentials({
        username: data.username,
        email: data.email,
        country: data.country,
        city: data.city,
        phone: data.phone,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${id}`, credentials);
      alert("Update user successfully!");
      navigate("/");
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="update">
      <div className="uContainer">
        <div className="input">
          <label htmlFor="">Username</label>
          <input
            type="text"
            value={credentials.username}
            id="username"
            onChange={handleChange}
            className="uInput"
          />
        </div>
        <div className="input">
          <label htmlFor="">Email</label>
          <input
            type="text"
            value={credentials.email}
            id="email"
            onChange={handleChange}
            className="uInput"
          />
        </div>
        <div className="input">
          <label htmlFor="">Country</label>
          <input
            type="text"
            value={credentials.country}
            id="country"
            onChange={handleChange}
            className="uText"
          />
        </div>
        <div className="input">
          <label htmlFor="">City</label>
          <input
            type="text"
            value={credentials.city}
            id="city"
            onChange={handleChange}
            className="uInput"
          />
        </div>
        <div className="input">
          <label htmlFor="">Phone</label>
          <input
            type="text"
            value={credentials.phone}
            id="phone"
            onChange={handleChange}
            className="uInput"
          />
        </div>
        <button className="uButton" onClick={handleClick}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateUser;
