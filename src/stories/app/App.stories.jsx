import React from 'react';

import App from '../../components/App.component';
import Categories from '../Categories';

export default {
	component: App,
	title: `${Categories.APP}/App`,
	excludeStories: /.*Data$/,
};

export const userData = {
	displayName: 'Testenaldo',
};

export const usersData = [
	{
		uid: 'josivaldo',
		displayName: 'Josivaldo',
	},
	{
		uid: 'oliandro',
		displayName: 'Oliandro da Cigarra',
		photoUrl: '',
		state: 'HAS_IMAGE',
	},
	{
		uid: 'kowianha',
		displayName: 'Kowianha',
	},
];

export const matrixData = [
	{
		uid: 'aaa',
		title: 'Testezera',
	},
];

export const notificationData = [
	{
		uid: 'aaa',
		title: 'Teste',
		notRead: true,
	},
	{
		uid: 'bbb',
		title: 'Testado',
	},
	{
		uid: 'ccc',
		title: 'Também Testado',
	},
];

export const Default = () => <App />;

export const LoggedIn = () => (
	<App
		user={userData}
		amountNotification={1}
		matrices={matrixData}
		notifications={notificationData}
		stateLogin="LOGGED"
		title="Testezera"
		users={usersData}
	/>
);
