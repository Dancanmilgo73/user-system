import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserPanel from "./UserPanel";
import AdminDashboard from "./AdminPanel";
export default function PrivateRoute() {
	const { userDetails, token } = useSelector((state) => state.auth);
	console.log(userDetails, token);

	return userDetails && userDetails.roleId === 1 ? (
		<AdminDashboard />
	) : userDetails && userDetails.roleId === 2 ? (
		<UserPanel />
	) : (
		<Navigate to='/' />
	);
}
