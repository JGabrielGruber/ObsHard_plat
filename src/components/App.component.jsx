import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import ArquiteturaContainer from '../containers/Arquitetura.container';

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
				</Switch>
			</Container>
		);
	}
}

export default withRouter(App);
