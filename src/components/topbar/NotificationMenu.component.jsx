import React from 'react';
import PropTypes from 'prop-types';
import {
	Menu, MenuItem, Typography, Badge,
} from '@material-ui/core';

class NotificationMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notifications: [],
		};
	}

	componentDidMount() {
		const that = this;
		if (that.props.notifications.length > 0) {
			this.setState({ notifications: that.props.notifications });
		}
	}

	render() {
		const { notifications } = this.state;
		const {
			element, onClose, onClick, open,
		} = this.props;

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
							<MenuItem
								key={notification.uid}
								onClick={onClick}
							>
								<Badge color="secondary" variant="dot" invisible={!notification.notRead}>
									<Typography>{notification.title}</Typography>
								</Badge>
							</MenuItem>
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
	// eslint-disable-next-line react/no-unused-prop-types
	notifications: PropTypes.arrayOf(PropTypes.shape({
		uid: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	})),
};

export default NotificationMenu;
