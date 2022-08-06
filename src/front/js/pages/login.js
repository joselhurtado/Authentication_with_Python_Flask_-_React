import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const { email, setEmail} = useState("");
	const { password, setPassword} = useState("");

	return (
		<div className="text-center mt-5">
			<h1>LOGIN</h1>
			<div>
				<input type='text' placeholder='Your Email' onChange={() => setEmail(e.target.value)} />
				<input type='password' placeholder='Your Password' onChange={() => setPassword(e.target.value)} />
				<div className='btn btn-primary' >Login</div>
			</div>
		</div>
	);
};
