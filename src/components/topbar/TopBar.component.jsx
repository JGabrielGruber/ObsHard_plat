import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
	Toolbar, IconButton, AppBar, Divider, Grid, Typography, Fade,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountAvatar from './AccountAvatar.component';
import Notification from './Notification.component';
import User from '../../models/User.model';

const useStyles = makeStyles(() => ({
	spacer: {
		flexGrow: 1,
	},
	root: {
		display: 'flex',
	},
}));

export default function TopBar({
	title,
	account,
	amountNotifications,
	stateLogin,
	onSideMenu,
	onLogin,
	onAccount,
	onNotification,
	isSideMenu,
}) {
	const classes = useStyles();

	return (
		<AppBar>
			<Toolbar>
				<Fade in={!isSideMenu}>
					<Grid container alignItems="center" className={classes.root}>
						<IconButton edge="start" color="inherit" aria-label="menu" onClick={onSideMenu}>
							<MenuIcon />
						</IconButton>
						<Grid item>
							<Typography variant="h5">
								{title}
							</Typography>
						</Grid>
					</Grid>
				</Fade>
				<Grid container direction="row-reverse">
					{stateLogin === 'NOT_LOGGED' ? (
						<AccountAvatar
							account={
								{ displayName: 'Fazer Log-In', photoUrl: '', state: 'HAS_IMAGE' }
							}
							onClick={onLogin}
						/>
					) : (
						<Grid className={classes.root}>
							<Divider orientation="vertical" variant="middle" flexItem />
							<Notification amount={amountNotifications} onClick={onNotification} />
							<AccountAvatar
								id="AccountMenuButton"
								account={account}
								onClick={onAccount}
							/>
						</Grid>
					)}
				</Grid>
			</Toolbar>
		</AppBar>
	);
}

TopBar.defaultProps = {
	title: '',
	account: {},
	amountNotifications: 0,
	stateLogin: 'NOT_LOGGED',
	onSideMenu: () => {},
	onLogin: () => {},
	onAccount: () => {},
	onNotification: () => {},
	isSideMenu: false,
};

TopBar.propTypes = {
	title: PropTypes.string,
	account: PropTypes.shape(User),
	amountNotifications: PropTypes.number,
	stateLogin: PropTypes.string,
	onSideMenu: PropTypes.func,
	onLogin: PropTypes.func,
	onAccount: PropTypes.func,
	onNotification: PropTypes.func,
	isSideMenu: PropTypes.bool,
};
