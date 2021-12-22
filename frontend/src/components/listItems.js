import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskIcon from "@mui/icons-material/Task";
import List from "@mui/material/List";
import { useSelector } from "react-redux";
const mainListItems = (
	<div>
		{/* <ListItem button>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary='Dashboard' />
		</ListItem> */}
		<ListItem button>
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<ListItemText primary='Projects' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary='Users' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<TaskIcon />
			</ListItemIcon>
			<ListItemText primary='Tasks' />
		</ListItem>
		{/* <ListItem button>
			<ListItemIcon>
				<LayersIcon />
			</ListItemIcon>
			<ListItemText primary='Integrations' />
		</ListItem> */}
	</div>
);

export const secondaryListItems = (
	<div>
		<ListSubheader inset>Saved reports</ListSubheader>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='Current month' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='Last quarter' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='Year-end sale' />
		</ListItem>
	</div>
);
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
			{/* <ListItem button>
			<ListItemIcon>
				<LayersIcon />
			</ListItemIcon>
			<ListItemText primary='Integrations' />
		</ListItem> */}
		</div>
	);
}
