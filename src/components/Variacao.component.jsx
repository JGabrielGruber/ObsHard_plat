import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import icons from './icons';
import Variacao from '../models/Variacao.model';
import Modelo from '../models/Modelo.model';

export default class VariacaoComponent extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const {
			actions, variacoes, modelos,
		} = this.props;

		const columns = [
			{ title: 'Nome', field: 'nome' },
			{ title: 'Modelo', field: 'marca', lookup: modelos },
		];

		return (
			<MaterialTable
				icons={icons}
				columns={columns}
				data={variacoes}
				editable={{
					onRowAdd: (newData) => new Promise((resolve, reject) => {
						setTimeout(() => {
							actions.onAdd(newData);
							resolve();
						}, 1000);
					}),
					onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
						setTimeout(() => {
							actions.onUpdate(newData, oldData);
							resolve();
						}, 1000);
					}),
					onRowDelete: (oldData) => new Promise((resolve, reject) => {
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
	modelos: PropTypes.objectOf(new Modelo().Modelo()),
};
