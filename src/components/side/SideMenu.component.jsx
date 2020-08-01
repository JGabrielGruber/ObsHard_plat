import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	IconButton, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip, ListSubheader,
} from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import ComputerIcon from '@material-ui/icons/Computer';
import DevicesIcon from '@material-ui/icons/Devices';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import BusinessIcon from '@material-ui/icons/Business';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TableChartIcon from '@material-ui/icons/TableChart';
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
	onNavSelect,
}) {
	const classes = useStyles();
	const theme = useTheme();

	const handleDrawerClose = () => {
		onSideMenu(false);
	};

	const location = useLocation();

	const isCurrentLocation = (tag) => location.pathname === `/${tag}`;

	const tablesList = [
		{
			title: 'Dashboard',
			tag: 'dashboard',
			icon: (<DashboardIcon />),
		},
		{
			title: 'Tabelona de Preços',
			tag: 'tabela',
			icon: (<TableChartIcon />),
		},
	];

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
			<List
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={isSideMenu ? (
					<ListSubheader component="div" id="nested-list-subheader">
						Dashboard e Tabela
					</ListSubheader>
				) : null}
			>
				{tablesList.map((obj) => (
					<Tooltip title={obj.title} key={obj.tag}>
						<ListItem
							button
							key={obj.tag}
							onClick={() => onNavSelect(obj.tag)}
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
			<List
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={isSideMenu ? (
					<ListSubheader component="div" id="nested-list-subheader">
						Formulários e Cadastros
					</ListSubheader>
				) : null}
			>
				{formsList.map((obj) => (
					<Tooltip title={obj.title} key={obj.tag}>
						<ListItem
							button
							key={obj.tag}
							onClick={() => onNavSelect(obj.tag)}
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
	onNavSelect: () => {},
};

SideMenu.propTypes = {
	onSideMenu: PropTypes.func,
	isSideMenu: PropTypes.bool,
	onNavSelect: PropTypes.func,
};
