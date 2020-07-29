import React from 'react';
import PropTypes from 'prop-types';

import { withRouter, Route, Switch } from 'react-router-dom';
import {
	Container, ThemeProvider, createMuiTheme, Grid,
} from '@material-ui/core';

import ArquiteturaContainer from '../containers/Arquitetura.container';
import MarcaContainer from '../containers/Marca.container';
import ModeloContainer from '../containers/Modelo.container';
import LojaContainer from '../containers/Loja.container';
import VariacaoContainer from '../containers/Variacao.container';
import ProdutoContainer from '../containers/Produto.container';
import TopBar from './topbar/TopBar.component';
import AccountMenu from './topbar/AccountMenu.component';
import NotificationMenu from './topbar/NotificationMenu.component';
import LoginComponent from './popups/Login.component';
import SignupComponent from './popups/Signup.component';
import RecoveryComponent from './popups/Recovery.component';
import User from '../models/User.model';
import SideMenu from './side/SideMenu.component';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			accountMenuElement: null,
			notiticationMenuElement: null,
			isSideMenuOpen: false,
			isAccountMenuOpen: false,
			isNotitificationMenuOpen: false,
			isLoginPopupOpen: false,
			isSignupPopupOpen: false,
			isRecoveryPopupOpen: false,
		};
		this.accountMenuElementRef = React.createRef();
	}

	accountHandler = (event) => {
		console.log(event);
	}

	accountMenuHandler = (event) => {
		event.persist();
		this.setState((prevState) => ({
			accountMenuElement: event.target,
			isAccountMenuOpen: !prevState.isAccountMenuOpen,
		}));
	}

	notificationMenuHandler = (event) => {
		event.persist();
		this.setState((prevState) => ({
			notiticationMenuElement: event.target,
			isNotitificationMenuOpen: !prevState.isNotitificationMenuOpen,
		}));
	}

	sideMenuHandler = () => {
		this.setState((prevState) => ({
			isSideMenuOpen: !prevState.isSideMenuOpen,
		}));
	}

	loginHandler = () => {
		this.setState((prevState) => ({
			isLoginPopupOpen: !prevState.isLoginPopupOpen,
		}));
	}

	signupHandler = () => {
		this.loginHandler();
		this.setState((prevState) => ({
			isSignupPopupOpen: !prevState.isSignupPopupOpen,
		}));
	}

	recoveryHandler = () => {
		this.loginHandler();
		this.setState((prevState) => ({
			isRecoveryPopupOpen: !prevState.isRecoveryPopupOpen,
		}));
	}

	handleLogin = async (login) => {
		const {
			onLogin,
		} = this.props;
		const log = await onLogin(login);
		if (log) {
			this.loginHandler();
		}
	}

	handleSignup = async (signup) => {
		const {
			onSignup,
		} = this.props;
		const sign = await onSignup(signup);
		if (sign) {
			this.signupHandler();
			this.loginHandler();
		}
	}

	handlePhoto = (photo) => {
		console.log(photo);
	}

	handleRecovery = (recovery) => {
		console.log(recovery);
	}

	handleMenu = (obj) => {
		const {
			history,
		} = this.props;

		history.push(`/${obj.key}`);
	}

	handleFormsList = (obj) => {
		const {
			history,
		} = this.props;
		history.push(`/${obj.tag}`);
	}

	render() {
		const theme = createMuiTheme({
			palette: {
				type: 'dark',
			},
		});

		const {
			accountMenuElement, notiticationMenuElement, isAccountMenuOpen,
			isNotitificationMenuOpen, isSideMenuOpen, isLoginPopupOpen,
			isSignupPopupOpen, isRecoveryPopupOpen,
		} = this.state;
		const {
			user, amountNotification, matrices, users, notifications, stateLogin,
			onLogout,
		} = this.props;

		const formsList = [
			{
				title: 'Arquiteturas',
				tag: 'arquiteturas',
			},
			{
				title: 'Lojas',
				tag: 'lojas',
			},
			{
				title: 'Marcas',
				tag: 'marcas',
			},
			{
				title: 'Modelos',
				tag: 'modelos',
			},
			{
				title: 'Produtos',
				tag: 'produtos',
			},
			{
				title: 'Variações',
				tag: 'variacoes',
			},
		];

		return (
			<ThemeProvider theme={theme}>
				<Container ref={this.accountMenuElementRef}>
					<Grid container direction="column" spacing={10}>
						<Grid item>
							<TopBar
								account={user}
								amountNotifications={amountNotification}
								stateLogin={stateLogin}
								title="Observatório de Hardware"
								users={users}
								onAccount={this.accountMenuHandler}
								onLogin={this.loginHandler}
								onNotification={this.notificationMenuHandler}
								onSideMenu={this.sideMenuHandler}
								isSideMenu={isSideMenuOpen}
							/>
							<SideMenu
								isSideMenu={isSideMenuOpen}
								onSideMenu={this.sideMenuHandler}
								formsList={formsList}
								onFormsList={this.handleFormsList}
							/>
						</Grid>
						<Grid item>
							<main style={{ paddingLeft: isSideMenuOpen ? 200 : 40 }}>
								<Switch>
									<Route path="/arquiteturas" component={ArquiteturaContainer} />
									<Route path="/lojas" component={LojaContainer} />
									<Route path="/marcas" component={MarcaContainer} />
									<Route path="/modelos" component={ModeloContainer} />
									<Route path="/produtos" component={ProdutoContainer} />
									<Route path="/variacoes" component={VariacaoContainer} />
								</Switch>
							</main>
						</Grid>
					</Grid>
					<AccountMenu
						element={accountMenuElement}
						matrices={matrices}
						open={isAccountMenuOpen}
						onAccount={this.accountHandler}
						onClick={this.matricesHandler}
						onClose={this.accountMenuHandler}
						onExit={onLogout}
					/>
					<NotificationMenu
						element={notiticationMenuElement}
						notifications={notifications}
						open={isNotitificationMenuOpen}
						onClose={this.notificationMenuHandler}
					/>
					<LoginComponent
						open={isLoginPopupOpen}
						onClose={this.loginHandler}
						onCreateA={this.signupHandler}
						onLogin={this.handleLogin}
						onPasswordR={this.recoveryHandler}
					/>
					<SignupComponent
						open={isSignupPopupOpen}
						onBack={this.signupHandler}
						onClose={() => {}}
						onSignup={this.handleSignup}
						onPhoto={this.handlePhoto}
					/>
					<RecoveryComponent
						open={isRecoveryPopupOpen}
						onBack={this.recoveryHandler}
						onClose={() => {}}
						onRecovery={this.handleRecovery}
					/>
				</Container>
			</ThemeProvider>
		);
	}
}

App.defaultProps = {
	user: null,
	amountNotification: 0,
	notifications: [],
	stateLogin: 'NOT_LOGGED',
};

App.propTypes = {
	user: PropTypes.shape(User),
	amountNotification: PropTypes.number,
	notifications: PropTypes.arrayOf(PropTypes.shape({
		uid: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	})),
	stateLogin: PropTypes.string,
	onLogin: PropTypes.func.isRequired,
	onSignup: PropTypes.func.isRequired,
	onLogout: PropTypes.func.isRequired,
};

export default withRouter(App);
