import React from 'react';
import firebase from 'firebase';

import App from '../components/App.component';
import UserRepository from '../repositories/User.repository';

class AppContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stateLogin: 'NOT_LOGGED',
			user: null,
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			this.setState({
				stateLogin: user ? 'LOGGED' : 'NOT_LOGGED',
				user,
			});
		});
	}

	render() {
		const {
			stateLogin, user,
		} = this.state;

		return (
			<App
				stateLogin={stateLogin}
				user={user}
				onLogin={UserRepository.login}
				onSignup={UserRepository.signup}
				onLogout={UserRepository.logout}
			/>
		);
	}
}

export default AppContainer;
