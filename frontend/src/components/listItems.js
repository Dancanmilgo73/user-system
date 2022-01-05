import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";

import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";

import TaskIcon from "@mui/icons-material/Task";

import { useSelector } from "react-redux";

export default function SideBar({ toggleButton }) {
	const { userDetails } = useSelector((state) => state.auth);

	return (
		<div>
			{userDetails.roleId === 1 ? (
				<>
					<ListItem button onClick={() => toggleButton("projects")}>
						<ListItemIcon>
							<BarChartIcon />
						</ListItemIcon>
						<ListItemText primary='Projects' />
					</ListItem>
					<ListItem button onClick={() => toggleButton("users")}>
						<ListItemIcon>
							<PeopleIcon />
						</ListItemIcon>
						<ListItemText primary='Users' />
					</ListItem>
					<ListItem button onClick={() => toggleButton("settings")}>
						<ListItemIcon>
							<TaskIcon />
						</ListItemIcon>
						<ListItemText primary='Settings' />
					</ListItem>
				</>
			) : (
				<>
					<ListItem button onClick={() => toggleButton("dashboard")}>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary='Dashboard' />
					</ListItem>
					<ListItem button onClick={() => toggleButton("settings")}>
						<ListItemIcon>
							<TaskIcon />
						</ListItemIcon>
						<ListItemText primary='Settings' />
					</ListItem>
				</>
			)}
		</div>
	);
}
