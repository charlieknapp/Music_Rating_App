import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const UserLog = () => {
  //sets username and password and a way to change the variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  
  //login function 
  const login = async (username, password) => {
    try {
      //sends username and password to backend and checks validity 
      const response = await axios.post(
        "http://localhost/Music-Rating-App/lyrical-lounge/src/backEnd/index.php/user/login",
        { username: username, password: password}
      );
      //checks to see if username and password in database if so directs them to the ratings otherwise alerts the user
      console.log("Logged in status:", response.data);
      if(response.data.message === "User logged in successfully")
      {
        localStorage.setItem("loggedInUser", username);
        navigate('/ratings');
      }
      else
      {
        //react notification
        NotificationManager.error('Invalid username or password!',"",1000);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    //html for login page
    <div className="container mt-5">
      <NotificationContainer/>
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Lyrical Lounge Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p className="mt-3">
          Don't Have An Account? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  </div>
);
};

export default UserLog;

