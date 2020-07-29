import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
	Modal, Container, TextField, Button, Grid, FormControl,
	Card, CardContent, CardHeader, IconButton, CardActions,
	Backdrop, Fade, Avatar, Tooltip,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CameraIcon from '@material-ui/icons/CameraAlt';

const styles = (theme) => ({
	root: {
		height: '100%',
	},
	avatar: {
		color: theme.palette.secondary.contrastText,
		backgroundColor: theme.palette.secondary.main,
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
});

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			displayName: '',
			email: '',
			password: '',
			phoneNumber: '',
			photoUrl: '',
			remember: false,
		};
	}

	handleChange = (event) => {
		if (event.target.id === 'remember') {
			this.setState((prevState) => ({
				remember: !prevState.remember,
			}));
		} else {
			this.setState({
				[event.target.id]: event.target.value,
			});
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { onSignup } = this.props;

		onSignup({
			...this.state,
		});

		return false;
	}

	handleClose = (event) => {
		event.preventDefault();
		const { onClose } = this.props;
		if (event.target.id === 'back-grid') {
			onClose(event);
		}
	}

	render() {
		const {
			displayName, email, password, phoneNumber, photoUrl,
		} = this.state;

		const {
			classes, open, onBack, onClose, onPhoto,
		} = this.props;

		return (
			<Modal
				open={open}
				onClose={onClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Grid
						id="back-grid"
						container
						justify="center"
						alignItems="center"
						className={classes.root}
					>
						<Container maxWidth="xs">
							<Card>
								<form onSubmit={this.handleSubmit}>
									<CardHeader
										title="Criar uma Conta"
										action={(
											<IconButton onClick={onBack}>
												<ArrowBackIcon />
											</IconButton>
										)}
									/>
									<CardContent>
										<Grid container justify="center">
											<Grid item>
												<Tooltip title="Selecionar Foto de Perfil">
													<IconButton onClick={onPhoto}>
														<Avatar
															className={classes.avatar}
															src={photoUrl}
															style={
																photoUrl !== '' ? { backgroundColor: '' } : null
															}
														>
															<CameraIcon />
														</Avatar>
													</IconButton>
												</Tooltip>
											</Grid>
										</Grid>
										<FormControl fullWidth>
											<TextField
												variant="outlined"
												margin="normal"
												required
												fullWidth
												id="displayName"
												label="Nome Completo"
												name="displayName"
												autoComplete="displayName"
												autoFocus
												value={displayName}
												onChange={this.handleChange}
											/>
										</FormControl>
										<FormControl fullWidth>
											<TextField
												variant="outlined"
												margin="normal"
												fullWidth
												id="phoneNumber"
												label="Celular"
												name="phoneNumber"
												autoComplete="phoneNumber"
												type="tel"
												autoFocus
												value={phoneNumber}
												onChange={this.handleChange}
											/>
										</FormControl>
										<FormControl fullWidth>
											<TextField
												variant="outlined"
												margin="normal"
												required
												fullWidth
												id="email"
												label="E-mail"
												name="email"
												autoComplete="email"
												type="email"
												autoFocus
												value={email}
												onChange={this.handleChange}
											/>
										</FormControl>
										<FormControl fullWidth>
											<TextField
												variant="outlined"
												margin="normal"
												required
												fullWidth
												name="password"
												label="Senha"
												type="password"
												id="password"
												autoComplete="current-password"
												value={password}
												onChange={this.handleChange}
											/>
										</FormControl>
									</CardContent>
									<CardActions>
										<Button
											type="submit"
											fullWidth
											variant="contained"
											color="primary"
										>
											Criar
										</Button>
									</CardActions>
								</form>
							</Card>
						</Container>
					</Grid>
				</Fade>
			</Modal>
		);
	}
}

Signup.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	classes: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	onBack: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	onSignup: PropTypes.func.isRequired,
	onPhoto: PropTypes.func.isRequired,
};

export default withStyles(styles)(Signup);
