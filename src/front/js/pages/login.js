import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const token = sessionStorage.getItem("token");
  console.log('This is your token', token);
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(email,"Email", password, "Password");

    const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
    };

    fetch(
      `${process.env.BACKEND_URL}/api/token`, opts)
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else alert("There has been some error");
      })
      .then((data) => {
        console.log("this came from the backend", data);
        sessionStorage.setItem("token", data.access_token);
        navigate('/protected');
      })
      .catch((error) => {
        console.error("There was an Error!!!", error);
      });
  };

  return (
    <div className="container-sm text-center mt-5">
      <h1>LOGIN</h1>
      {token && token != "" && token != undefined ? (
        "You are logged in with this token" + token
      ) : (
        <div>
          <input
            type="text"
            placeholder="Your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="btn btn-primary">
            <div onClick={handleClick}>
              Login
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
