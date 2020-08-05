import React from 'react';
import PropTypes from 'prop-types';
import {
	TextField, DialogContent, DialogActions, Button, DialogTitle, Dialog, Grid, LinearProgress,
} from '@material-ui/core';
import {
	MuiPickersUtilsProvider, KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

class AddPrecoModal extends React.Component {
	constructor() {
		super();

		this.state = {
			preco: '',
			data: new Date(),
			loading: false,
		};

		this.form = React.createRef();
	}

	handleChange = (prop) => (event) => {
		this.setState({
			[prop]: event.target.value,
		});
	};

	handleChangeDate = (date) => {
		this.setState({
			data: date,
		});
	}

	handleSubmit = () => {
		if (this.form.current.reportValidity()) {
			const {
				data, preco,
			} = this.state;
			const {
				mod, onAdd, handleOpen,
			} = this.props;
			onAdd(mod, [Number(preco), Math.round(data.getTime() / 1000)]).then(() => handleOpen(false));
		}
	};

	render() {
		const {
			handleOpen, isOpen,
		} = this.props;

		const {
			preco, data, loading,
		} = this.state;

		return (
			<Dialog
				open={isOpen}
				onClose={() => handleOpen(false)}
			>
				<DialogTitle>Adicionar Preços a todos os Produtos</DialogTitle>
				<DialogContent>
					<form autoComplete="off" ref={this.form}>
						<Grid container justify="space-between" spacing={2}>
							<Grid item>
								<TextField
									id="preco-input"
									label="Preço"
									margin="normal"
									value={preco}
									onChange={this.handleChange('preco')}
									type="number"
									required
								/>
							</Grid>
							<Grid item>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										id="data-input"
										label="Data"
										format="dd/MM/yyyy"
										margin="normal"
										value={data}
										onChange={this.handleChangeDate}
										required
									/>
								</MuiPickersUtilsProvider>
							</Grid>
						</Grid>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleOpen(false)}>
						Cancelar
					</Button>
					<Button
						onClick={this.handleSubmit}
						color="primary"
					>
						Adicionar
					</Button>
				</DialogActions>
				<LinearProgress color="secondary" hidden={!loading} />
			</Dialog>
		);
	}
}

AddPrecoModal.propTypes = {
	mod: PropTypes.string.isRequired,
	onAdd: PropTypes.func.isRequired,
	handleOpen: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
};

export default AddPrecoModal;
