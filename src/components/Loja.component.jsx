import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import icons from './icons';
import Loja from '../models/Loja.model';

export default class LojaComponent extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const { actions, lojas } = this.props;

		const columns = [
			{ title: 'Nome', field: 'nome' },
			{ title: 'Tag', field: 'tag' },
			{ title: 'Propriedade', field: 'propriedade' },
			{ title: 'Atributo', field: 'atributo' },
		];

		return (
			<MaterialTable
				icons={icons}
				columns={columns}
				data={lojas}
				editable={{
					onRowAdd: (newData) => new Promise((resolve, reject) => {
						setTimeout(() => {
							// setData([...data, newData]);
							actions.onAdd(newData);
							resolve();
						}, 1000);
					}),
					onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
						setTimeout(() => {
							/* const dataUpdate = [...data];
							const index = oldData.tableData.id;
							dataUpdate[index] = newData;
							setData([...dataUpdate]); */
							actions.onUpdate(newData, oldData);
							resolve();
						}, 1000);
					}),
					onRowDelete: (oldData) => new Promise((resolve, reject) => {
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
				title="Lojas"
			/>
		);
	}
}

LojaComponent.protoTypes = {
	lojas: PropTypes.arrayOf(new Loja().Loja()),
	actions: PropTypes.objectOf({
		onAdd: PropTypes.func,
		onUpdate: PropTypes.func,
		onDelete: PropTypes.func,
	}),
};
