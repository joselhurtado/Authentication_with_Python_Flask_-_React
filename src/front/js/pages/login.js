import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const token = sessionStorage.getItem("token");
  console.log('This is your token', token);

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
      "https://3001-joselhurtad-jwtauthwith-7690lnephyr.ws-us59.gitpod.io/api/token", opts)
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else alert("There has been some error");
      })
      .then((data) => {
        console.log("this came from the backend", data);
        sessionStorage.setItem("token", data.access_token);
      })
      .catch((error) => {
        console.error("There was an Error!!!", error);
      });
  };

  return (
    <div className="text-center mt-5">
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
          <div className="btn btn-primary" onClick={handleClick}>
            Login
          </div>
        </div>
      )}
    </div>
  );
};
