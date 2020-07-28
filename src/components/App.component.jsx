import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Container, ThemeProvider, createMuiTheme } from '@material-ui/core';
import ArquiteturaContainer from '../containers/Arquitetura.container';
import MarcaContainer from '../containers/Marca.container';
import ModeloContainer from '../containers/Modelo.container';
import Loja from '../models/Loja.model';
import LojaContainer from '../containers/Loja.container';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const theme = createMuiTheme({
			palette: {
				type: 'dark',
			},
		});

		return (
			<ThemeProvider theme={theme}>
				<Container>
					<Switch>
						<Route path="/arquitetura" component={ArquiteturaContainer} />
						<Route path="/loja" component={LojaContainer} />
						<Route path="/marca" component={MarcaContainer} />
						<Route path="/modelo" component={ModeloContainer} />
					</Switch>
				</Container>
			</ThemeProvider>
		);
	}
}

export default withRouter(App);
