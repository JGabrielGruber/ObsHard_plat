import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	IconButton, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListIcon from '@material-ui/icons/List';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	spacer: {
		flexGrow: 1,
	},
	root: {
		display: 'flex',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
}));

export default function SideMenu({
	onSideMenu,
	isSideMenu,
	formsList,
	onFormsList,
}) {
	const classes = useStyles();
	const theme = useTheme();

	const handleDrawerClose = () => {
		onSideMenu(false);
	};

	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: isSideMenu,
				[classes.drawerClose]: !isSideMenu,
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: isSideMenu,
					[classes.drawerClose]: !isSideMenu,
				}),
			}}
		>
			<div className={classes.toolbar}>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</div>
			<Divider />
			<List>
				{formsList.map((obj) => (
					<ListItem button key={obj.tag} onClick={() => onFormsList(obj)}>
						<ListItemIcon><ListIcon /></ListItemIcon>
						<ListItemText primary={obj.title} />
					</ListItem>
				))}
			</List>
		</Drawer>
	);
}

SideMenu.defaultProps = {
	onSideMenu: () => {},
	isSideMenu: false,
	formsList: [],
	onFormsList: () => {},
};

SideMenu.propTypes = {
	onSideMenu: PropTypes.func,
	isSideMenu: PropTypes.bool,
	formsList: PropTypes.array,
	onFormsList: PropTypes.func,
};
