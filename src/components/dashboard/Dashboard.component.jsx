import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
	Container, Grid, Paper, Typography, Button,
} from '@material-ui/core';
import Produto from '../../models/Produto.model';

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
	produtos,
}) {
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	return (
		<Container maxWidth="lg">
			<Grid container spacing={3}>
				<Grid item xs={12} md={4} lg={3}>
					<Paper className={fixedHeightPaper}>
						<Typography component="h2" variant="h6" color="primary" gutterBottom>
							Total de produtos
						</Typography>
						<Typography component="p" variant="h4" className={classes.totalProdutos}>
							{produtos.length}
						</Typography>
						<div>
							<Button variant="text" color="primary" href="#" size="small" onClick={() => {}}>
								Ver produtos
							</Button>
						</div>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}

DashboardComponent.defaultProps = {
	produtos: [],
};

DashboardComponent.protoTypes = {
	produtos: PropTypes.arrayOf(new Produto().Produto()),
};

export default DashboardComponent;
