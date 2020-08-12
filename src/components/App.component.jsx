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
import RecoveryComponent from './popups/Recovery.component';
import User from '../models/User.model';
import SideMenu from './side/SideMenu.component';
import CategoriaContainer from '../containers/Categoria.container';
import DashboardContainer from '../containers/Dashboard.container';
import TabelaContainer from '../containers/Tabela.container';
import BotContainer from '../containers/Bot.container';
import NotificationM from '../models/Notification.model';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			amountNotifications: 0,
			accountMenuElement: null,
			notiticationMenuElement: null,
			isSideMenuOpen: false,
			isAccountMenuOpen: false,
			isNotitificationMenuOpen: false,
			isLoginPopupOpen: false,
			isRecoveryPopupOpen: false,
		};
		this.accountMenuElementRef = React.createRef();
	}

	componentDidUpdate(previousProps, previousState) {
		const { notifications } = this.props;
		if (this.state === previousState && this.props !== previousProps
			&& previousProps.notifications.length > 0) {
			const dif = notifications.filter(
				(x) => previousProps.notifications.find((y) => y.timestamp === x.timestamp) === undefined,
			);
			if (dif.length > 0) {
				if (Notification.permission === 'granted') {
					dif.forEach((item) => {
						const notification = new Notification(item.title, {
							icon: 'https://jgabrielgruber.github.io/ObsHard_plat/logo192.png',
							body: item.content,
						});
						notification.onclick = () => {
							window.open(`https://jgabrielgruber.github.io/ObsHard_plat/#/produtos/${item.key}`);
						};
					});
				}
				const { amountNotifications } = this.state;
				this.setState({
					amountNotifications: dif.length + amountNotifications,
				});
			}
		}
	}

	isSame = (x, y) => {
		let objectsAreSame = true;
		Object.keys(x).forEach((propertyName) => {
			if (x[propertyName] !== y[propertyName]) {
				objectsAreSame = false;
			}
		});
		return objectsAreSame;
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
		if (Notification.permission === 'granted') {
			this.setState((prevState) => ({
				amountNotifications: 0,
				notiticationMenuElement: event.target,
				isNotitificationMenuOpen: !prevState.isNotitificationMenuOpen,
			}));
		} else {
			Notification.requestPermission();
		}
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

	handleRecovery = (recovery) => {
		console.log(recovery);
	}

	handleMenu = (obj) => {
		const {
			history,
		} = this.props;

		history.push(`/${obj.key}`);
	}

	handleNavSelect = (tag) => {
		const {
			history,
		} = this.props;
		history.push(`/${tag}`);
	}

	render() {
		const theme = createMuiTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? {
			palette: {
				type: 'dark',
				primary: {
					light: '#a6d4fa',
					main: '#90caf9',
					dark: '#648dae',
					contrastText: '#000',
				},
				secondary: {
					light: '#f2aeae',
					main: '#ef9a9a',
					dark: '#a76b6b',
					contrastText: '#000',
				},
				error: {
					light: '#ff616f',
					main: '#ff1744',
					dark: '#c4001d',
					contrastText: '#000',
				},
			},
			overrides: {
				MuiToolbar: {
					root: {
						backgroundColor: '#313131',
						color: '#fff',
					},
				},
				MuiPaper: {
					root: {
						backgroundColor: '#313131',
					},
				},
				MuiDrawer: {
					paper: {
						backgroundColor: '#242424',
					},
				},
				MuiTable: {
					root: {
						backgroundColor: '#242424',
					},
				},
				MuiTableRow: {
					head: {
						backgroundColor: '#242424',
					},
				},
			},
		} : {
			palette: {
				type: 'light',
				primary: {
					light: '#5393ff',
					main: '#2979ff',
					dark: '#1c54b2',
					contrastText: '#fff',
				},
				secondary: {
					light: '#ff7474',
					main: '#ff5252',
					dark: '#b23939',
					contrastText: '#fff',
				},
			},
		});

		document.body.style = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'background: #1f1f1f;' : 'background: #FFF;';

		const {
			accountMenuElement, notiticationMenuElement, isAccountMenuOpen,
			isNotitificationMenuOpen, isSideMenuOpen, isLoginPopupOpen,
			isRecoveryPopupOpen, amountNotifications,
		} = this.state;
		const {
			user, matrices, users, notifications, stateLogin,
			onLogout,
		} = this.props;

		return (
			<ThemeProvider theme={theme}>
				<Container ref={this.accountMenuElementRef}>
					<Grid container direction="column" spacing={10}>
						<Grid item>
							<TopBar
								account={user}
								amountNotifications={amountNotifications}
								stateLogin={stateLogin}
								title={/Mobi/i.test(window.navigator.userAgent) ? 'Observatório' : 'Observatório de Hardware'}
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
								onNavSelect={this.handleNavSelect}
							/>
						</Grid>
						<Grid item>
							<main style={{ paddingLeft: isSideMenuOpen ? 200 : 40 }}>
								<Switch>
									<Route path="/dashboard" component={DashboardContainer} />
									<Route path="/tabela" component={TabelaContainer} />
									<Route path="/arquiteturas" component={ArquiteturaContainer} />
									<Route path="/categorias" component={CategoriaContainer} />
									<Route path="/lojas" component={LojaContainer} />
									<Route path="/marcas" component={MarcaContainer} />
									<Route path="/modelos" component={ModeloContainer} />
									<Route path="/produtos" component={ProdutoContainer} />
									<Route path="/variacoes" component={VariacaoContainer} />
									<Route path="/bot" component={BotContainer} />
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
	notifications: PropTypes.arrayOf(PropTypes.shape(new NotificationM().NotificationM())),
	stateLogin: PropTypes.string,
	onLogin: PropTypes.func.isRequired,
	onSignup: PropTypes.func.isRequired,
	onLogout: PropTypes.func.isRequired,
};

export default withRouter(App);
