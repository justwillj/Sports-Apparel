import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

// import loginUser from './HeaderService';
// import constants from '../../utils/constants';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = ({ user, setUser }) => {
	const history = useHistory();

	const handleClick = () => {
		setUser({});
		history.push("/home");
	};

	return (
		<div style={{ backgroundColor: "darkgrey", position: "sticky", top: 0, zIndex:3 }}>
			<Grid container direction="row" spacing={2} justify="space-between">
            <Grid item>
					<NavLink to="/home"><img src="https://ibb.co/tPHLLQw" alt="Site logo" /></NavLink>
				</Grid>
				<Grid item xs={1}>
					{user.email ? (
						<span>
							<span>({user.email})</span>
							<button type="button" onClick={handleClick}>
								Logout
							</button>
						</span>
					) : (
						<NavLink to="/login">Login</NavLink>
					)}
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={3} justify="center" alignItems="center">
				<Grid item>
					<NavLink to="/home"></NavLink>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={9} justify="center">
				<Grid item>
					<button>Men</button>
				</Grid>
				<Grid item>
					<button>Women</button>
				</Grid>
				<Grid item>
					<button>Kids</button>
				</Grid>
			</Grid>

			{/* <NavLink to="/home">Home</NavLink>
      <NavLink to="/checkout">Cart</NavLink>
      {user && <span>{user.firstName}</span>}
      {user && <span>{user.lastName}</span>}
      {apiError && <span>Api Error</span>} */}
		</div>
	);
};

export default Header;
