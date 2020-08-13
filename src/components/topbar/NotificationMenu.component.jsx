import React from 'react';
import PropTypes from 'prop-types';
import {
	Menu, MenuItem, Typography, Badge, Grid, Divider,
} from '@material-ui/core';
import NotificationM from '../../models/Notification.model';

function NotificationMenu({
	element, notifications, onClose, onClick, open,
}) {
	return (
		<Menu
			id="menu-notification"
			anchorEl={element}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={open}
			onClose={onClose}
		>
			{ notifications.length > 0 ? (
				<div>
					{ notifications.map((notification) => (
						<>
							<MenuItem
								key={notification.key}
								onClick={onClick}
							>
								<Badge color="secondary" variant="dot" invisible={!notification.notRead}>
									<Grid container direction="column">
										<Typography variant="subtitle2">{notification.title}</Typography>
										<Typography variant="h6">{notification.content}</Typography>
										<Typography variant="caption">
											{
												notification.timestamp ? new Date((notification.timestamp * 1000)).toLocaleString() : ''
											}
										</Typography>
									</Grid>
								</Badge>
							</MenuItem>
							<Divider />
						</>
					)) }
				</div>
			) : (
				<MenuItem disabled>
					<Typography variant="caption" color="textSecondary">
						Não há notificações!
					</Typography>
				</MenuItem>
			)}
		</Menu>
	);
}

NotificationMenu.defaultProps = {
	open: false,
	notifications: [],
	onClick: () => {},
};

NotificationMenu.propTypes = {
	onClose: PropTypes.func.isRequired,
	onClick: PropTypes.func,
	open: PropTypes.bool,
	notifications: PropTypes.arrayOf(PropTypes.shape(new NotificationM().NotificationM())),
};

export default NotificationMenu;
