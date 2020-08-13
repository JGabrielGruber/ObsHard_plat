import React from 'react';
import PropTypes from 'prop-types';
import {
	Typography, Paper, Dialog, DialogTitle, DialogContent,
	Grid, TableContainer, Table, TableHead, TableRow, TableCell,
	TableBody, Button,
} from '@material-ui/core';
import Produto from '../models/Produto.model';

class ProdutoModal extends React.Component {
	constructor() {
		super();

		this.state = {
			open: false,
			key: '',
			produto: new Produto(),
		};
	}

	componentDidMount() {
		const { match } = this.props;
		this.setState({ key: match.params.key, open: true });
	}

	componentDidUpdate(pS, pP) {
		const { produto } = this.state;
		if ((this.props !== pP || this.state !== pS) && produto._id === null) {
			const { produtos } = this.props;
			const { key } = this.state;
			const pr = produtos.find((o) => o._id === key);
			if (pr) {
				this.setState({
					produto: pr,
				});
			}
		}
	}

	handleOpen = (open) => {
		this.setState({ open });
		const {
			history,
		} = this.props;
		if (history) history.push('/produtos');
	}

	render() {
		const {
			lojas, modelos, variacoes,
		} = this.props;

		const {
			open, produto,
		} = this.state;

		const numberFormat = (value) => new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(value);

		const dateFormat = (value) => new Date((value * 1000)).toLocaleString();

		return (
			<Dialog
				open={open}
				onClose={() => this.handleOpen(false)}
				fullWidth
				maxWidth="md"
			>
				<DialogTitle>Detalhes do Produto</DialogTitle>
				<DialogContent>
					<Grid container direction="row" justify="space-between">
						<Grid item>
							<Typography>
								{`${modelos[produto.modelo]} ${variacoes[produto.variacao]}`}
							</Typography>
						</Grid>
						<Grid item>
							<Typography>
								{produto.status}
							</Typography>
						</Grid>
					</Grid>
					<Grid container direction="row" justify="space-between">
						<Grid item>
							<Typography>
								{lojas[produto.loja]}
							</Typography>
						</Grid>
						<Grid item>
							<Button href={produto.link} color="primary">
								Link
							</Button>
						</Grid>
					</Grid>
					<TableContainer component={Paper}>
						<Table size="medium">
							<TableHead>
								<TableRow>
									<TableCell>Preço</TableCell>
									<TableCell>Data</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{ produto.precos ? produto.precos.map((item, index) => (
									<TableRow key={`l-${index}`}>
										<TableCell component="th" scope="row">
											{numberFormat(item[0])}
										</TableCell>
										<TableCell component="th" scope="row">
											{dateFormat(item[1])}
										</TableCell>
									</TableRow>
								))
									: (
										<TableRow key="log">
											<TableCell component="th" scope="row">
												Não há logs
											</TableCell>
										</TableRow>
									) }
							</TableBody>
						</Table>
					</TableContainer>
				</DialogContent>
			</Dialog>
		);
	}
}

ProdutoModal.propTypes = {
	lojas: PropTypes.object.isRequired,
	modelos: PropTypes.object.isRequired,
	produtos: PropTypes.array.isRequired,
	variacoes: PropTypes.object.isRequired,
};

export default ProdutoModal;
