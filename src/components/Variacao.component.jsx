import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import icons from './icons';
import Variacao from '../models/Variacao.model';

export default class VariacaoComponent extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const {
			actions, variacoes,
		} = this.props;

		const columns = [
			{ title: 'Nome', field: 'nome' },
		];

		return (
			<MaterialTable
				icons={icons}
				columns={columns}
				data={variacoes}
				editable={{
					onRowAdd: (newData) => new Promise((resolve) => {
						setTimeout(() => {
							actions.onAdd(newData);
							resolve();
						}, 1000);
					}),
					onRowUpdate: (newData, oldData) => new Promise((resolve) => {
						setTimeout(() => {
							actions.onUpdate(newData, oldData);
							resolve();
						}, 1000);
					}),
					onRowDelete: (oldData) => new Promise((resolve) => {
						setTimeout(() => {
							actions.onDelete(oldData);
							resolve();
						}, 1000);
					}),
				}}
				title="Variações"
			/>
		);
	}
}

VariacaoComponent.protoTypes = {
	variacoes: PropTypes.arrayOf(new Variacao().Variacao()),
	actions: PropTypes.objectOf({
		onAdd: PropTypes.func,
		onUpdate: PropTypes.func,
		onDelete: PropTypes.func,
	}),
};
