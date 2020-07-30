import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	IconButton, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Icon, Tooltip,
} from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListIcon from '@material-ui/icons/List';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import ComputerIcon from '@material-ui/icons/Computer';
import DevicesIcon from '@material-ui/icons/Devices';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import BusinessIcon from '@material-ui/icons/Business';
import { useLocation } from 'react-router-dom';

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
			width: theme.spacing(7) + 1,
		},
	},
	selectedIcon: {
		color: theme.palette.primary.main,
	},
}));

export default function SideMenu({
	onSideMenu,
	isSideMenu,
	onFormsList,
}) {
	const classes = useStyles();
	const theme = useTheme();

	const handleDrawerClose = () => {
		onSideMenu(false);
	};

	const location = useLocation();

	const isCurrentLocation = (tag) => location.pathname === `/${tag}`;

	const formsList = [
		{
			title: 'Arquiteturas',
			tag: 'arquiteturas',
			icon: (<BusinessIcon />),
		},
		{
			title: 'Categorias',
			tag: 'categorias',
			icon: (<BookmarksIcon />),
		},
		{
			title: 'Lojas',
			tag: 'lojas',
			icon: (<AttachMoneyIcon />),
		},
		{
			title: 'Marcas',
			tag: 'marcas',
			icon: (<BrandingWatermarkIcon />),
		},
		{
			title: 'Modelos',
			tag: 'modelos',
			icon: (<ComputerIcon />),
		},
		{
			title: 'Produtos',
			tag: 'produtos',
			icon: (<ShoppingCartIcon />),
		},
		{
			title: 'Variações',
			tag: 'variacoes',
			icon: (<DevicesIcon />),
		},
	];

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
					<Tooltip title={obj.title} key={obj.tag}>
						<ListItem
							button
							key={obj.tag}
							onClick={() => onFormsList(obj)}
							selected={isCurrentLocation(obj.tag)}
						>
							<ListItemIcon className={isCurrentLocation(obj.tag) ? classes.selectedIcon : null}>
								{obj.icon}
							</ListItemIcon>
							<ListItemText primary={obj.title} />
						</ListItem>
					</Tooltip>
				))}
			</List>
		</Drawer>
	);
}

SideMenu.defaultProps = {
	onSideMenu: () => {},
	isSideMenu: false,
	onFormsList: () => {},
};

SideMenu.propTypes = {
	onSideMenu: PropTypes.func,
	isSideMenu: PropTypes.bool,
	onFormsList: PropTypes.func,
};
