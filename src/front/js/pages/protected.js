import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Protected = () => {
  const { store, actions } = useContext(Context);
  const [isLogin, setIsLogin] = useState(false);
  const token = sessionStorage.getItem("token");
  console.log("This is your token", token);

  const opts = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //Fetch need to be place on flux
  fetch(
    "https://3001-joselhurtad-jwtauthwith-7690lnephyr.ws-us59.gitpod.io/api/protected", 
    opts
  )
    .then((response) => response.status === 200 ? setIsLogin(true): "")
    .catch((err) => console.error(err));

  useEffect(() => {console.log(token)}, [token])            //Use Effect WIP

  return (
    <div className="text-center mt-5">
      <h1>LOGIN PROTECTED</h1>
      {isLogin ? (
        "You are logged in with this token" + token
      ) : (
        <div>
          <h1>You need to Login</h1>
        </div>
      )}
    </div>
  );
};
