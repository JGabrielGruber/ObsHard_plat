import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import icons from './icons';
import Arquitetura from '../models/Arquitetura.model';
import Categoria from '../models/Categoria.model';

export default class ArquiteturaComponent extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const { actions, arquiteturas, categorias } = this.props;

		const columns = [
			{ title: 'Nome', field: 'nome' },
			{ title: 'Ano', field: 'ano', type: 'numeric' },
			{ title: 'Categorias', field: 'categorias', lookup: categorias },
		];

		return (
			<MaterialTable
				icons={icons}
				columns={columns}
				data={arquiteturas}
				editable={{
					onRowAdd: (newData) => new Promise((resolve) => {
						setTimeout(() => {
							// setData([...data, newData]);
							actions.onAdd(newData);
							resolve();
						}, 1000);
					}),
					onRowUpdate: (newData, oldData) => new Promise((resolve) => {
						setTimeout(() => {
							/* const dataUpdate = [...data];
							const index = oldData.tableData.id;
							dataUpdate[index] = newData;
							setData([...dataUpdate]); */
							actions.onUpdate(newData, oldData);
							resolve();
						}, 1000);
					}),
					onRowDelete: (oldData) => new Promise((resolve) => {
						setTimeout(() => {
							/* const dataDelete = [...data];
							const index = oldData.tableData.id;
							dataDelete.splice(index, 1);
							setData([...dataDelete]); */
							actions.onDelete(oldData);
							resolve();
						}, 1000);
					}),
				}}
				title="Arquiteturas"
			/>
		);
	}
}

ArquiteturaComponent.propTypes = {
	arquiteturas: PropTypes.arrayOf(PropTypes.shape(new Arquitetura().Arquitetura())).isRequired,
	actions: PropTypes.shape({
		onAdd: PropTypes.func,
		onUpdate: PropTypes.func,
		onDelete: PropTypes.func,
	}).isRequired,
	categorias: PropTypes.shape(new Categoria().Categoria()).isRequired,
};
