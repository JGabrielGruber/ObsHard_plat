import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import ArquiteturaContainer from '../containers/Arquitetura.container';
import MarcaContainer from '../containers/Marca.container';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<Container>
				<Switch>
					<Route path="/arquitetura" component={ArquiteturaContainer} />
					<Route path="/marca" component={MarcaContainer} />
				</Switch>
			</Container>
		);
	}
}

export default withRouter(App);
