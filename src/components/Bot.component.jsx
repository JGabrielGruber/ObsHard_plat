import React from 'react';
import PropTypes from 'prop-types';
import {
	Typography, Grid, Toolbar, Paper, Switch, FormControl, FormControlLabel,
	InputAdornment, Input, InputLabel, FormHelperText, Table, TableBody, TableRow,
	TableContainer, TableCell, TableHead, Tooltip, IconButton,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';

import Bot from '../models/Bot.model';

const styles = (theme) => ({
	statusOk: {
		color: theme.palette.text.primary,
	},
	statusError: {
		color: theme.palette.text.secondary,
	},
	statusD: {
		color: theme.palette.text.disabled,
	},
});

class BotComponent extends React.Component {
	constructor() {
		super();

		this.state = {
			edit: false,
			lBot: new Bot(),
		};
	}

	handleEdit = () => {
		const { bot } = this.props;

		this.setState({
			lBot: { ...bot },
			edit: true,
		});
	}

	handleSubmit = () => {
		const { actions } = this.props;
		const { lBot } = this.state;

		actions.onUpdate(lBot);
		this.setState({
			edit: false,
		});
	}

	handleChange = (k) => (event) => {
		event.preventDefault();
		const { lBot } = this.state;
		lBot[k] = event.target.value || event.target.checked;
		this.setState({
			lBot,
		});
	}

	render() {
		const { edit, lBot } = this.state;
		const { bot, classes } = this.props;

		const getColorStatus = (status) => {
			switch (status) {
			case 'ok':
				return classes.statusOk;
			case 'erro':
				return classes.statusError;
			default:
				return classes.statusD;
			}
		};

		const getTextStatus = (status) => {
			switch (status) {
			case 'ok':
				return 'Ocioso';
			case 'load':
				return 'Buscando';
			case 'erro':
				return 'Erro';
			default:
				return 'Inativo';
			}
		};

		return (
			<Paper>
				<Toolbar>
					<Grid container justify="space-between">
						<Typography variant="h6">
							Bot
						</Typography>
						<Grid item>
							{ edit ? (
								<Tooltip title="Salvar" onClick={this.handleSubmit}>
									<IconButton>
										<CheckIcon />
									</IconButton>
								</Tooltip>
							) : (
								<Tooltip title="Editar" onClick={this.handleEdit}>
									<IconButton>
										<EditIcon />
									</IconButton>
								</Tooltip>
							) }

						</Grid>
					</Grid>
				</Toolbar>
				<Grid
					container
					direction="row"
					justify="space-around"
					spacing={4}
				>
					<Grid item>
						<FormControl>
							<FormControlLabel
								label="Fazer Buscas"
								labelPlacement="top"
								control={(
									<Switch
										name="ativo"
										checked={edit ? lBot.ativo : bot.ativo}
										draggable={edit}
										color="secondary"
										onChange={this.handleChange('ativo')}
									/>
								)}
							/>
						</FormControl>
					</Grid>
					<Grid item>
						<InputLabel htmlFor="intervalo">Intervalo entre Buscas</InputLabel>
						<Input
							id="intervalo"
							label="Intervalo entre Buscas"
							endAdornment={<InputAdornment position="end">M</InputAdornment>}
							aria-describedby="intervalo-helper-text"
							type="number"
							value={edit ? lBot.intervalo : bot.intervalo}
							onChange={this.handleChange('intervalo')}
						/>
						<FormHelperText id="intervalo-helper-text">Intervalo em Minutos</FormHelperText>
					</Grid>
					<Grid item>
						<Typography>
							Estado
						</Typography>
						<Typography className={getColorStatus(bot.status)}>
							{getTextStatus(bot.status)}
						</Typography>
					</Grid>
				</Grid>
				<Grid container justify="space-around" spacing={4}>
					<Grid item>
						<TableContainer component={Paper}>
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell>Logs</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{ bot.logs ? bot.logs.map((log, index) => (
										<TableRow key={`l-${index}`}>
											<TableCell component="th" scope="row">
												{log}
											</TableCell>
										</TableRow>
									)) : 'Não há logs' }
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}

BotComponent.defaultProps = {
	bot: new Bot(),
};

BotComponent.propTypes = {
	bot: PropTypes.objectOf(new Bot().Bot()),
	actions: PropTypes.objectOf({
		onUpdate: PropTypes.func,
	}).isRequired,
};

export default withStyles(styles)(BotComponent);
