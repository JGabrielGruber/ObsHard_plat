import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import initializeFirebase from './configFirebase';

import AppContainer from './containers/App.container';

initializeFirebase();

ReactDOM.render(
	<Router basename={process.env.PUBLIC_URL}>
		<Switch>
			<Route path="/" component={AppContainer} />
		</Switch>
	</Router>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
