import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import icons from './icons';
import Produto from '../models/Produto.model';
import Loja from '../models/Loja.model';
import Variacao from '../models/Variacao.model';
import Modelo from '../models/Modelo.model';

export default class ProdutoComponent extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const {
			actions, produtos, lojas, modelos, variacoes,
		} = this.props;

		const columns = [
			{ title: 'Loja', field: 'loja', lookup: lojas },
			{ title: 'Modelo', field: 'marca', lookup: modelos },
			{ title: 'Variacao', field: 'variacao', lookup: variacoes },
			{ title: 'Link', field: 'link', type: 'string' },
			{ title: 'Status', field: 'status', lookup: { ok: 'ok' } },
		];

		return (
			<MaterialTable
				icons={icons}
				columns={columns}
				data={produtos}
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
				title="Produtos"
			/>
		);
	}
}

ProdutoComponent.protoTypes = {
	produtos: PropTypes.arrayOf(new Produto().Produto()),
	actions: PropTypes.objectOf({
		onAdd: PropTypes.func,
		onUpdate: PropTypes.func,
		onDelete: PropTypes.func,
	}),
	lojas: PropTypes.objectOf(new Loja().Loja()),
	variacoes: PropTypes.objectOf(new Variacao().Variacao()),
	modelos: PropTypes.objectOf(new Modelo().Modelo()),
};
