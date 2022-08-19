import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Protected = () => {
  const { store, actions } = useContext(Context);
  const [isLogin, setIsLogin] = useState(false);
  const token = sessionStorage.getItem("token");
  // console.log("This is your token", token); //Display Token on Frontend

  const opts = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {     //Use Effect Edits
  fetch(
    `${process.env.BACKEND_URL}/api/protected`, //New URL path route
    opts
  )
    .then((response) => response.status === 200 ? setIsLogin(true): "")
    .catch((err) => console.error(err));
}, [token])           

  return (
    <div className="container text-center mt-5">
      <h1>LOGIN PROTECTED CONTENT</h1>

        <div className='mt-5 p-3 mb-2 bg-warning text-dark'>
          <h4>You need to Login to access</h4>
        </div>
    </div>
  );
};
