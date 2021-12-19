import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
export default function UsersList() {
	const [checked, setChecked] = React.useState([1]);
	const { users, loading } = useSelector((state) => state.users);

	const handleToggle = (user) => () => {
		const currentIndex = checked.indexOf(user);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(user);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
			{users.map((user) => {
				const labelId = `checkbox-list-secondary-label-${user}`;
				return (
					<ListItem
						key={user}
						secondaryAction={
							<Checkbox
								edge='end'
								onChange={handleToggle(user)}
								checked={checked.indexOf(user) !== -1}
								inputProps={{ "aria-labelledby": labelId }}
							/>
						}
						disablePadding>
						<ListItemButton>
							<ListItemAvatar>
								<Avatar
									alt={`Avatar n°${user + 1}`}
									// src={`/static/images/avatar/${user + 1}.jpg`}
								/>
							</ListItemAvatar>
							<ListItemText id={labelId} primary={user.username} />
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
}
