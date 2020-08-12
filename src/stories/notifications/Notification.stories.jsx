/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import Notification from '../../components/topbar/Notification.component';
import Categories from '../Categories';

export default {
	component: Notification,
	title: `${Categories.NOTIFICATIONS}/Notification`,
	excludeStories: /.*Data$/,
};

export const actionsData = {
	onClick: action('onClick'),
};

export const Default = () => <Notification {...actionsData} />;

export const Few = () => <Notification amount={3} {...actionsData} />;

export const Lot = () => <Notification amount={20} {...actionsData} />;
