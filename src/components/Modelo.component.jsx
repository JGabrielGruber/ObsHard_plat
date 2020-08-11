import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';

import icons from './icons';
import Modelo from '../models/Modelo.model';
import Arquitetura from '../models/Arquitetura.model';
import Marca from '../models/Marca.model';
import AddPrecoModal from './AddPrecoModal.component';

export default class ModeloComponent extends React.Component {
	constructor() {
		super();

		this.state = {
			isPrecoOpen: false,
			precoRow: null,
		};
	}

	handlePreco = (isPrecoOpen, precoRow = null) => {
		this.setState({ isPrecoOpen });
		if (precoRow) this.setState({ precoRow });
	}

	render() {
		const {
			isPrecoOpen, precoRow,
		} = this.state;

		const {
			actions, modelos, arquiteturas, marcas, onAddPreco,
		} = this.props;

		const columns = [
			{ title: 'Nome', field: 'nome' },
			{ title: 'Ano', field: 'ano', type: 'numeric' },
			{ title: 'Arquitetura', field: 'arquitetura', lookup: arquiteturas },
			{ title: 'Marca', field: 'marca', lookup: marcas },
		];

		return (
			<>
				<MaterialTable
					icons={icons}
					columns={columns}
					data={modelos}
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
					actions={[
						{
							icon: 'attach_money',
							tooltip: 'Adicionar Preço a todos os Produtos',
							onClick: (_, rowData) => this.handlePreco(!isPrecoOpen, rowData),
						},
					]}
					title="Modelos"
				/>
				<AddPrecoModal
					mod={precoRow ? precoRow._id : ''}
					onAdd={onAddPreco}
					handleOpen={this.handlePreco}
					isOpen={isPrecoOpen}
				/>
			</>
		);
	}
}

ModeloComponent.propTypes = {
	modelos: PropTypes.arrayOf(PropTypes.shape(new Modelo().Modelo())).isRequired,
	actions: PropTypes.shape({
		onAdd: PropTypes.func,
		onUpdate: PropTypes.func,
		onDelete: PropTypes.func,
	}).isRequired,
	arquiteturas: PropTypes.shape(new Arquitetura().Arquitetura()).isRequired,
	marcas: PropTypes.shape(new Marca().Marca()).isRequired,
	onAddPreco: PropTypes.func.isRequired,
};
