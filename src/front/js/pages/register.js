import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Register = () => {
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
        sessionStorage.setItem("token", data);
        navigate('/protected');
      })
      .catch((error) => {
        console.error("There was an Error!!!", error);
      });
  };

  return (
    <div className="text-center mt-5">
      <h1>REGISTER</h1>
        <form>
          <div className="form-group mt-5">
              <input className="col-3"
                type="text"
                placeholder="Your Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              </div><div className="form-group">
                <input className="col-3"
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                </div>
                  <div className="col-3 form-group btn btn-warning">
                    <div onClick={handleClick}>
                     Sign Up
                    </div>
                  </div>
        </form> 
    </div>
  );
};
