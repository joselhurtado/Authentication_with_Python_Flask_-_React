import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const { email, setEmail} = useState("");
	const { password, setPassword} = useState("");

const handleClick = () => {
	const opts = {
		method: 'POST',
		body: JSON.stringify({
			"email": email,
			"password": password
		})
	}
	fetch('https://3000-4geeksacade-reactflaskh-xpm8eu1lzpr.ws-us59.gitpod.io/api/token', opts)
		.then(resp => {
			if(resp.status === 200) return resp.json();
			else alert('There has been some error');
		})
		.then()
		.catch(error =>
			console.error('There was an Error!!!', error));
}

	return (
		<div className="text-center mt-5">
			<h1>LOGIN</h1>
			<div>
				<input type='text' placeholder='Your Email' value={email} onChange={() => setEmail(e.target.value)} />
				<input type='password' placeholder='Your Password' value={password} onChange={() => setPassword(e.target.value)} />
				<div className='btn btn-primary' onClick={handleClick}>Login</div>
			</div>
		</div>
	);
};
