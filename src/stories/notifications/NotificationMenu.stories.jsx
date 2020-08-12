/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import NotificationMenu from '../../components/topbar/NotificationMenu.component';
import Categories from '../Categories';

export default {
	component: NotificationMenu,
	title: `${Categories.NOTIFICATIONS}/Notification Menu`,
	excludeStories: /.*Data$/,
};

export const menuData = {
	element: null,
};

export const notificationData = {
	notifications: [
		{
			uid: 'aa',
			title: 'ATENÇÃO',
			content: 'O Rafa é um viado!!!',
			timestamp: 1597257207564,
			notRead: true,
		},
		{
			uid: 'aaa',
			title: 'R9 295 X2',
			content: 'R$2.000 -> R$2.400',
			timestamp: 1597257207564,
			notRead: true,
		},
		{
			uid: 'bbb',
			title: 'HD 5450',
			content: 'R$100 -> R$5.000',
			timestamp: 1597257207564,
			notRead: true,
		},
		{
			uid: 'ccc',
			title: 'A4 4000',
			content: 'R$10 -> R$10.000',
			timestamp: 1597257207564,
			notRead: true,
		},
	],
};

export const actionsData = {
	onClose: action('onClose'),
};

export const Opened = () => <NotificationMenu {...menuData} open {...actionsData} />;

export const OpenedWithNotifications = () => (
	<NotificationMenu
		{...menuData}
		{...notificationData}
		open
		{...actionsData}
		onClick={action('onClick')}
	/>
);

export const Closed = () => <NotificationMenu {...menuData} {...actionsData} />;
