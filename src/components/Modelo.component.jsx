import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import icons from './icons';
import Modelo from '../models/Modelo.model';
import Arquitetura from '../models/Arquitetura.model';
import Marca from '../models/Marca.model';

export default class ModeloComponent extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const {
			actions, modelos, arquiteturas, marcas,
		} = this.props;

		const columns = [
			{ title: 'Nome', field: 'nome' },
			{ title: 'Ano', field: 'ano', type: 'numeric' },
			{ title: 'Arquitetura', field: 'arquitetura', lookup: arquiteturas },
			{ title: 'Marca', field: 'marca', lookup: marcas },
		];

		return (
			<MaterialTable
				icons={icons}
				columns={columns}
				data={modelos}
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
				title="Modelos"
			/>
		);
	}
}

ModeloComponent.protoTypes = {
	modelos: PropTypes.arrayOf(new Modelo().Modelo()),
	actions: PropTypes.objectOf({
		onAdd: PropTypes.func,
		onUpdate: PropTypes.func,
		onDelete: PropTypes.func,
	}),
	arquiteturas: PropTypes.objectOf(new Arquitetura().Arquitetura()),
	marcas: PropTypes.objectOf(new Marca().Marca()),
};
