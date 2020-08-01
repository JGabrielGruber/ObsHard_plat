import React from 'react';
import PropTypes from 'prop-types';

import { Button, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';

import SearchLookupFilter from './SearchLookupFilter.component';
import Produto from '../../models/Produto.model';
import Loja from '../../models/Loja.model';
import Variacao from '../../models/Variacao.model';
import Modelo from '../../models/Modelo.model';
import Categoria from '../../models/Categoria.model';
import Arquitetura from '../../models/Arquitetura.model';
import Marca from '../../models/Marca.model';

export default class TabelaComponent extends React.Component {
	constructor() {
		super();

		this.state = {
			data: [],
		};
	}

	updateData = (props = null) => {
		const { data } = this.state;
		const { produtos } = props || this.props;

		for (let index = 0; index < (produtos.length / 2); index += 1) {
			data.push(produtos[index]);
		}
		this.setState({ data });
	}

	render() {
		const {
			produtos, categorias, arquiteturas, marcas, modelos, variacoes, lojas,
		} = this.props;

		const {
			data,
		} = this.state;

		const columns = [
			{
				title: 'Categoria',
				field: 'modelo.arquitetura.categorias.nome',
				width: 10,
				lookup: categorias,
				customFilterAndSearch: (
					term, rowData,
				) => term[0] === rowData.modelo.arquitetura.categorias._id || !term[0],
				render: (rowData) => <Typography>{rowData.modelo.arquitetura.categorias.nome}</Typography>,
			},
			{
				title: 'Arquitetura',
				field: 'modelo.arquitetura.nome',
				lookup: arquiteturas,
				customFilterAndSearch: (
					term, rowData,
				) => term[0] === rowData.modelo.arquitetura._id || !term[0],
				render: (rowData) => <Typography>{rowData.modelo.arquitetura.nome}</Typography>,
			},
			{
				title: 'Marca',
				field: 'modelo.marca.nome',
				width: 10,
				lookup: marcas,
				customFilterAndSearch: (term, rowData) => term[0] === rowData.modelo.marca._id || !term[0],
				render: (rowData) => <Typography>{rowData.modelo.marca.nome}</Typography>,
			},
			{
				title: 'Modelo',
				field: 'modelo.nome',
				lookup: modelos,
				customFilterAndSearch: (term, rowData) => term[0] === rowData.modelo._id || !term[0],
				render: (rowData) => <Typography>{rowData.modelo.nome}</Typography>,
			},
			{
				title: 'Variacao',
				field: 'variacao.nome',
				lookup: variacoes,
				customFilterAndSearch: (term, rowData) => term[0] === rowData.variacao._id || !term[0],
				render: (rowData) => <Typography>{rowData.variacao.nome}</Typography>,
			},
			{
				title: 'Loja',
				field: 'loja.nome',
				lookup: lojas,
				customFilterAndSearch: (term, rowData) => term[0] === rowData.loja._id || !term[0],
				render: (rowData) => <Button href={rowData.link}>{rowData.loja.nome}</Button>,
				width: 10,
			},
			{ title: 'Review', field: 'review' },
			{
				title: 'Status', field: 'status', lookup: { ok: 'ok' },
			},
		];

		return (
			<>
				<MaterialTable
					columns={columns}
					data={produtos}
					options={{
						grouping: true,
						filtering: true,
					}}
					title="Produtos"
					components={{
						FilterRow: (props) => <SearchLookupFilter {...props} />,
					}}
				/>
				<Button onClick={this.updateData}>AAAAAAAAA</Button>
			</>
		);
	}
}

TabelaComponent.protoTypes = {
	produtos: PropTypes.arrayOf(new Produto().Produto()),
	categorias: PropTypes.objectOf(new Categoria().Categoria()),
	arquiteturas: PropTypes.objectOf(new Arquitetura().Arquitetura()),
	marcas: PropTypes.objectOf(new Marca().Marca()),
	modelos: PropTypes.objectOf(new Modelo().Modelo()),
	variacoes: PropTypes.objectOf(new Variacao().Variacao()),
	lojas: PropTypes.objectOf(new Loja().Loja()),
};
