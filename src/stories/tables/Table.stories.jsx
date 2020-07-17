import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

import Table from '../../components/tables/Table.component';
import Categories from '../Categories';

export default {
	component: Table,
	title: `${Categories.TABLES}/Table`,
	excludeStories: /.*Data$/,
};

export const columnsData = [
	{ title: 'Nome', field: 'name' },
	{ title: 'Sobrenome', field: 'surname' },
	{ title: 'Data de Nascimento', field: 'birthYear', type: 'numeric' },
	{
		title: 'Cidade Natal',
		field: 'birthCity',
		lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
	},
];

export const rowsData = [
	{
		name: 'Mehmet',
		surname: 'Baran',
		birthYear: 1987,
		birthCity: 63,
	},
];

export const actionsData = [
	{
		icon: 'check',
		tooltip: 'Salvar',
		onClick: action('onSave'),
	},
	{
		icon: 'add',
		tooltip: 'Adicionar',
		onClick: action('onAdd'),
	},
	{
		icon: 'del',
		tooltip: 'Excluir',
		onClick: action('onDel'),
	},
];

// export const Default = () => <Table rows={rowsData} {...actionsData} />;

export const Default = () => <Table columns={columnsData} data={rowsData} actions={actionsData} />;
