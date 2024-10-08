import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Registration = () => {
    //set variables and a way to change them
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm] = useState("");

    //function called when the form is submitted chat gpt helped here 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await submit(username, password, confirm_password);
        } catch (error) {
          console.error('Error submitting registration:', error);
        }
      };

      //sends username and password and confirmed password to backend where they will be added to the database
      const submit = async () => {
        try {
            console.log(username, password, confirm_password);
            const response = await axios.post("http://localhost/Music-Rating-App/lyrical-lounge/src/backEnd/index.php/user/create",
            { username: username, password: password, confirm_password: confirm_password }
          );
            console.log(response);
            // notifications for different account creation scenarios
            if(response.data.message === 'User created successfully')
            {
              NotificationManager.success('User successfully created, please go to login page!',"",1000);
            }
            else if(response.data.error === 'Password and confirm password must match')
            {
              NotificationManager.error('Passwords must match!',"",1000);
            }
            else if(response.data.error === 'Username already exists. Please choose a different username.')
            {
              NotificationManager.error('Username already exists!',"",1000);
            }

        } catch (error) {
          console.error('Error submitting registration:', error);
          throw error;
        }
    };
    

    return (
      //html for signup form
<div className="container mt-5">
<div className="container">
    <NotificationContainer/>
    </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Lyrical Lounge Sign Up</h4>
                    <form onSubmit={handleSubmit} method="POST">
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm_password">Confirm Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirm_password"
                                value={confirm_password}
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <p className="mt-3">
                        Already Have An Account? <Link to='/'>Login Here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Registration;