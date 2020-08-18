import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
	Container, Grid, Paper, Typography, Button,
} from '@material-ui/core';
import Produto from '../../models/Produto.model';
import Loja from '../../models/Loja.model';
import NotificationM from '../../models/Notification.model';
import NotificacoesW from './NotificacoesW.component';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
	totalProdutos: {
		flex: 1,
	},
}));

function DashboardComponent({
	lojas, notifications, produtos,
}) {
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	return (
		<Grid container spacing={4}>
			<Grid item xs={4} md={4} lg={4}>
				<Paper className={fixedHeightPaper}>
					<Typography component="h2" variant="h6" color="primary" gutterBottom>
						Total de produtos
					</Typography>
					<Typography component="p" variant="h4" className={classes.totalProdutos}>
						{Object.keys(produtos).length}
					</Typography>
					<div>
						<Button variant="text" color="primary" href="#/produtos" size="small">
							Ver produtos
						</Button>
					</div>
				</Paper>
			</Grid>
			<Grid item xs={8} md={8} lg={8}>
				<Paper className={fixedHeightPaper}>
					<Typography component="h2" variant="h6" color="primary" gutterBottom>
						Alterações
					</Typography>
					<NotificacoesW lojas={lojas} notifications={notifications} produtos={produtos} />
				</Paper>
			</Grid>
		</Grid>
	);
}

DashboardComponent.defaultProps = {
	lojas: [],
	notifications: [],
	produtos: [],
};

DashboardComponent.propTypes = {
	lojas: PropTypes.objectOf(PropTypes.shape(new Loja().Loja())),
	notifications: PropTypes.arrayOf(PropTypes.shape(new NotificationM().NotificationM())),
	produtos: PropTypes.objectOf(PropTypes.shape(new Produto().Produto())),
};

export default DashboardComponent;
