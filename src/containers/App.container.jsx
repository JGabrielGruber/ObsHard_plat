import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import App from '../components/App.component';
import UserRepository from '../repositories/User.repository';
import NotificationRepository from '../repositories/Notification.repository';

class AppContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stateLogin: 'NOT_LOGGED',
			user: null,
			notifications: [],
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			this.setState({
				stateLogin: user ? 'LOGGED' : 'NOT_LOGGED',
				user,
			});
		});
		NotificationRepository.sync('notifications', this.handleChange);
	}

	handleChange = (key, value, index) => {
		if (index) {
			const ar = this.state[key];
			ar[index] = value || undefined;
			this.setState({
				[key]: ar,
			});
		} else {
			this.setState({
				[key]: value || undefined,
			});
		}
	}

	render() {
		const {
			stateLogin, user, notifications,
		} = this.state;

		return (
			<App
				stateLogin={stateLogin}
				user={user}
				onLogin={UserRepository.login}
				onSignup={() => {}}
				onLogout={UserRepository.logout}
				notifications={notifications}
			/>
		);
	}
}

export default AppContainer;
