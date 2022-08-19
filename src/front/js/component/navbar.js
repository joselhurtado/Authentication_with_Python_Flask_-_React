import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-sm">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">JWT Authentication</span>
				</Link>
				<div className="ml-auto">
				<Link to="/login">
						<button className="btn btn-primary m-1">Login</button>
					</Link>
				<Link to="/protected">
						<button className="btn btn-secondary m1">Protected</button>
					</Link>
				<Link to="register">
						<button className="btn btn-warning m1">Sign Up</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
