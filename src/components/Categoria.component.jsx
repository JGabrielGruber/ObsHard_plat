import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import icons from './icons';
import Categoria from '../models/Categoria.model';

export default class CategoriaComponent extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const {
			actions, categorias,
		} = this.props;

		const columns = [
			{ title: 'Nome', field: 'nome' },
		];

		return (
			<MaterialTable
				icons={icons}
				columns={columns}
				data={categorias}
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
				title="Categorias"
			/>
		);
	}
}

CategoriaComponent.propTypes = {
	categorias: PropTypes.arrayOf(PropTypes.shape(new Categoria().Categoria())).isRequired,
	actions: PropTypes.shape({
		onAdd: PropTypes.func,
		onUpdate: PropTypes.func,
		onDelete: PropTypes.func,
	}).isRequired,
};
