import React, { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/login", loginData)
      .then((res) => {
        console.log(res.data);
        if (res.data == null) {
          let alertfont = document.getElementById("alertText");
          alertfont.style.display = "block";

          console.log("wrong");
        } else {
          if (
            res.data.email === loginData.email &&
            res.data.pass === loginData.password
          ) {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className="container">
        <form className="login-box" onSubmit={submitForm}>
          <h1>Login</h1>
          <p className="text-danger text-center  " id="alertText" >
            Invalid email or password
          </p>
          <div className="i-box">
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(event) =>
                setLoginData({ ...loginData, email: event.target.value })
              }
            />
          </div>
          <div className="i-box">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(event) =>
                setLoginData({ ...loginData, password: event.target.value })
              }
            />
          </div>

          <div className="f-pass">
            <lable>
              <input type="checkbox" />
              Remember me
            </lable>
            <Link to="/forget">Forget Password?</Link>
          </div>

          <button className="btn">Login</button>
          <div className="s-btn">
            <p>
              Don't Have An Account? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
