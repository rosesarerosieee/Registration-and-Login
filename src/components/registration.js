import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { ref, onValue, push } from "firebase/database";
import "./registration.css";

const Registration = () => {
  const [credentials, setCredentials] = useState({
    Name: "",
    Username: "",
    Password: "",
  });

  const [loginCredentials, setLoginCredentials] = useState({
    Username: "",
    Password: "",
  });

  const [allUser, setAllUser] = useState([]);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  useEffect(() => {
    const taskRef = ref(db, "registration");
    const unsubscribe = onValue(taskRef, (snapShot) => {
      const user = [];
      snapShot.forEach((childSnapShot) => {
        user.push({ id: childSnapShot.key, ...childSnapShot.val() });
      });

      setAllUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const taskRef = ref(db, "registration");
    const { Name, Username, Password } = credentials;
    push(taskRef, {
      Name,
      Username,
      Password,
    })
      .then(() => {
        setCredentials({
          Name: "",
          Username: "",
          Password: "",
        });
      })
      .catch((error) => {
        console.log("Error pushing Credentials", error);
      });
    alert("Register Succesful!");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { Username, Password } = loginCredentials;
    const user = allUser.find(
      (user) => user.Username === Username && user.Password === Password
    );
    if (user) {
      alert("welcome");
    } else {
      alert("Invalid Username or Password");
    }
  };

  const isinLogin = () => {
    setIsLoginVisible((prevIsLogin) => !prevIsLogin);
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="label">
            <span className="register-label" onClick={isinLogin}>
              Register
            </span>
          </div>

          <div
            className={`register ${
              isinLogin ? "loginVisible" : "LoginNotVisible"
            }`}
          >
            <form onSubmit={handleRegisterSubmit}>
              <div className="register-input">
                <h3 className="register-label1">Register</h3>
                <div className="name-input">
                  <input
                    type="text"
                    name="Name"
                    value={credentials.Name}
                    placeholder="Input your name"
                    required
                    onChange={handleChangeRegister}
                  />
                </div>

                <div className="username-input">
                  <input
                    type="text"
                    name="Username"
                    value={credentials.Username}
                    placeholder="Input Your username"
                    required
                    onChange={handleChangeRegister}
                  />
                </div>

                <div className="password-input">
                  <input
                    type="password"
                    name="Password"
                    value={credentials.Password}
                    placeholder="Input your password"
                    required
                    onChange={handleChangeRegister}
                  />
                </div>

                <div className="register-submit">
                  <button type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>

          <div
            className={`login ${
              !isLoginVisible ? "loginVisible" : "LoginNotVisble"
            }`}
          >
            <form onSubmit={handleLoginSubmit}>
              <div className="login-input">
                <h3 className="login-label1">Login</h3>
                <div className="username-input">
                  <input
                    type="text"
                    name="Username"
                    value={loginCredentials.Username}
                    onChange={handleChangeLogin}
                    placeholder="Enter your Username"
                    required
                  />
                </div>

                <div className="password-input">
                  <input
                    type="password"
                    name="Password"
                    value={loginCredentials.Password}
                    onChange={handleChangeLogin}
                    placeholder="Enter your Password"
                    required
                  />
                </div>

                <div className="login-button">
                  <button type="submit">Login</button>
                </div>
              </div>
            </form>
          </div>

          <div className="label">
            <span className="login-label" onClick={isinLogin}>
              Login
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
