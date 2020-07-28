import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

import ArquiteturaComponent from '../../components/Arquitetura.component';
import Categories from '../Categories';
import Arquitetura from '../../models/Arquitetura.model';

export default {
	component: ArquiteturaComponent,
	title: `${Categories.TABLES}/Arquitetura`,
	excludeStories: /.*Data$/,
};

export const rowsData = [
	new Arquitetura(
		'Testa',
		2002,
	),
];

export const actionsData = {
	onUpdate: action('onUpdate'),
	onAdd: action('onAdd'),
	onDelete: action('onDelete'),
};

// export const Default = () => <Table rows={rowsData} {...actionsData} />;

export const Default = () => <ArquiteturaComponent arquiteturas={rowsData} actions={actionsData} />;
