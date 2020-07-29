import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
	Modal, Container, Typography, TextField, FormControlLabel,
	Checkbox, Button, Grid, FormControl, Card, CardContent, CardHeader,
	IconButton, CardActions, Backdrop, Fade,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = () => ({
	root: {
		height: '100%',
	},
});

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
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
		const { onLogin } = this.props;

		onLogin({
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
		const { email, password, remember } = this.state;

		const {
			classes, open, onClose, onCreateA, onPasswordR,
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
					<Grid id="back-grid" container justify="center" alignItems="center" className={classes.root}>
						<Container maxWidth="xs">
							<Card>
								<CardHeader
									title="Log-in"
									action={(
										<IconButton onClick={onClose}>
											<CloseIcon />
										</IconButton>
									)}
								/>
								<CardContent>
									<form onSubmit={this.handleSubmit}>
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
										<FormControlLabel
											control={(
												<Checkbox
													id="remember"
													value={remember}
													color="primary"
													onChange={this.handleChange}
												/>
											)}
											label="Lembrar me"
											onChange={this.handleChange}
										/>
										<Button
											type="submit"
											fullWidth
											variant="contained"
											color="primary"
										>
											Acessar
										</Button>
									</form>
								</CardContent>
								<CardActions>
									<Grid container spacing={4}>
										<Grid item xs>
											<Button
												color="primary"
												variant="text"
												onClick={onPasswordR}
											>
												<Typography variant="body2">
													Esqueceu a senha?
												</Typography>
											</Button>
										</Grid>
									</Grid>
								</CardActions>
							</Card>
						</Container>
					</Grid>
				</Fade>
			</Modal>
		);
	}
}

Login.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	classes: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onLogin: PropTypes.func.isRequired,
	onPasswordR: PropTypes.func.isRequired,
	onCreateA: PropTypes.func.isRequired,
};

export default withStyles(styles)(Login);
