import React from 'react';
import PropTypes from 'prop-types';

import { Button, Typography, Tooltip } from '@material-ui/core';
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
			columnsH: {
				categoria: true,
				arquitetura: true,
				marca: true,
				modelo: true,
				variacao: true,
				produto: false,
				loja: false,
				status: false,
				mPreco: false,
				mPrecoD: true,
				preco: false,
				update: false,
			},
		};
	}

	render() {
		const {
			tabelona, categorias, arquiteturas, modelos, marcas, variacoes, lojas,
		} = this.props;

		const {
			columnsH
		} = this.state;

		const numberFormat = (value) => new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(value);

		const columns = [
			{
				title: 'Categoria',
				field: 'categoria',
				lookup: categorias,
				width: 5,
				render: (rowData) => <Typography>{rowData.categoria}</Typography>,
				hidden: columnsH.categoria,
			},
			{
				title: 'Arquitetura',
				field: 'arquitetura',
				lookup: arquiteturas,
				width: 10,
				render: (rowData) => <Typography>{rowData.arquitetura}</Typography>,
				hidden: columnsH.arquitetura,
			},
			{
				title: 'Marca',
				field: 'marca',
				lookup: marcas,
				width: 10,
				render: (rowData) => <Typography>{rowData.marca}</Typography>,
				hidden: columnsH.marca,
			},
			{
				title: 'Modelo',
				field: 'modelo',
				lookup: modelos,
				render: (rowData) => <Typography>{rowData.modelo}</Typography>,
				hidden: columnsH.modelo,
			},
			{
				title: 'Variacao',
				field: 'variacao',
				lookup: variacoes,
				render: (rowData) => <Typography>{rowData.variacao}</Typography>,
				hidden: true,
			},

			{
				title: 'Produto',
				field: 'variacao',
				customFilterAndSearch: (
					term, rowData,
				) => `${rowData.marca} ${rowData.modelo} ${rowData.variacao}`.toLowerCase().includes(String(term).toLowerCase()),
				render: (rowData) => <Typography>{`${rowData.marca} ${rowData.modelo} ${rowData.variacao}`}</Typography>,
				hidden: columnsH.produto,
			},
			{
				title: 'Loja',
				field: 'loja',
				lookup: lojas,
				width: 10,
				render: (rowData) => <Button href={rowData.link} color="primary">{rowData.loja}</Button>,
				hidden: columnsH.loja,
			},
			{
				title: 'Status',
				field: 'status',
				lookup: { ok: 'ok' },
				width: 3,
				render: (rowData) => <Typography color={rowData.status === 'ok' ? 'inherit' : 'error'}>{rowData.status}</Typography>,
				hidden: columnsH.status,
			},
			{
				title: 'Menor Preço',
				field: 'mPreco',
				width: 3,
				render: (rowData) => (rowData.mPreco
					? (
						<Tooltip title={new Date(rowData.mPreco[1]).toLocaleString()}>
							<Typography>{numberFormat(rowData.mPreco[0])}</Typography>
						</Tooltip>
					)
					: null
				),
				hidden: columnsH.mPreco,
			},
			{
				title: 'Menor Preço Data',
				field: 'mPreco',
				width: 150,
				render: (rowData) => (rowData.mPreco
					? (
						<Typography>
							{
								new Date(rowData.mPreco[1]).toLocaleString()
							}
						</Typography>
					)
					: null
				),
				hidden: columnsH.mPrecoD,
			},
			{
				title: 'Preço',
				field: 'preco',
				width: 3,
				render: (rowData) => (rowData.preco
					? (
						<Tooltip title={new Date(rowData.preco[1]).toLocaleString()}>
							<Typography>{numberFormat(rowData.preco[0])}</Typography>
						</Tooltip>
					)
					: null
				),
				hidden: columnsH.preco,
			},
			{
				title: 'Verificado',
				field: 'update',
				width: 3,
				render: (rowData) => (
					<Typography>
						{
							new Date(rowData.update).toLocaleString()
						}
					</Typography>
				),
				hidden: columnsH.update,
			},
		];

		return (
			<>
				<MaterialTable
					columns={columns}
					data={tabelona}
					options={{
						grouping: true,
						filtering: true,
					}}
					title="Tabelona de Preços"
					components={{
						FilterRow: (props) => <SearchLookupFilter {...props} />,
					}}
				/>
			</>
		);
	}
}

TabelaComponent.protoTypes = {
	tabelona: PropTypes.array,
	categorias: PropTypes.objectOf(new Categoria().Categoria()),
	arquiteturas: PropTypes.objectOf(new Arquitetura().Arquitetura()),
	marcas: PropTypes.objectOf(new Marca().Marca()),
	modelos: PropTypes.objectOf(new Modelo().Modelo()),
	variacoes: PropTypes.objectOf(new Variacao().Variacao()),
	lojas: PropTypes.objectOf(new Loja().Loja()),
};
