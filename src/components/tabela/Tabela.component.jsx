import React from 'react';
import PropTypes from 'prop-types';

import {
	Button, Typography, Tooltip, IconButton,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import MUIDataTable from 'mui-datatables';
import RateReviewIcon from '@material-ui/icons/RateReview';

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
				review: true,
				categoria: false,
				arquitetura: false,
				marca: false,
				modelo: false,
				variacao: false,
				produto: true,
				loja: true,
				status: true,
				mPreco: true,
				mPrecoD: false,
				preco: true,
				update: true,
			},
		};
	}

	render() {
		const {
			tabelona, categorias, arquiteturas, modelos, marcas, variacoes, lojas,
		} = this.props;

		const {
			columnsH,
		} = this.state;

		const numberFormat = (value) => new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(value);

		const columns = [
			{
				label: 'Review',
				name: 'review',
				options: {
					customBodyRenderLite: (i) => (
						<IconButton href={tabelona[i].review} disabled={tabelona[i].review === undefined}>
							<RateReviewIcon />
						</IconButton>
					),
					display: columnsH.review,
					searchable: false,
					filter: false,
				},
			},
			{
				label: 'Categoria',
				name: 'categoria',
				width: 5,
				options: {
					customBodyRenderLite: (i) => <Typography>{tabelona[i].categoria}</Typography>,
					display: columnsH.categoria,
				},
			},
			{
				label: 'Arquitetura',
				name: 'arquitetura',
				width: 10,
				options: {
					customBodyRenderLite: (i) => <Typography>{tabelona[i].arquitetura}</Typography>,
					display: columnsH.arquitetura,
				},
			},
			{
				label: 'Marca',
				name: 'marca',
				width: 10,
				options: {
					customBodyRenderLite: (i) => <Typography>{tabelona[i].marca}</Typography>,
					display: columnsH.marca,
				},
			},
			{
				label: 'Modelo',
				name: 'modelo',
				options: {
					customBodyRenderLite: (i) => <Typography>{tabelona[i].modelo}</Typography>,
					display: columnsH.modelo,
				},
			},
			{
				label: 'Variacao',
				name: 'variacao',
				options: {
					customBodyRenderLite: (i) => <Typography>{tabelona[i].variacao}</Typography>,
					display: columnsH.variacao,
				},
			},

			{
				label: 'Produto',
				name: '',
				options: {
					customBodyRender: (_value, tableMeta) => <Typography>{`${tableMeta.rowData[2]} ${tableMeta.rowData[3]} ${tableMeta.rowData[4]}`}</Typography>,
					display: columnsH.produto,
					filter: false,
					searchable: false,
				},
			},
			{
				label: 'Loja',
				name: 'loja',
				width: 10,
				options: {
					customBodyRenderLite: (i) => <Button href={tabelona[i].link} color="primary">{tabelona[i].loja}</Button>,
					display: columnsH.loja,
				},
			},
			{
				label: 'Status',
				name: 'status',
				width: 3,
				options: {
					customBodyRenderLite: (i) => <Typography color={tabelona[i].status === 'ok' ? 'inherit' : 'error'}>{tabelona[i].status}</Typography>,
					display: columnsH.status,
				},
			},
			{
				label: 'Menor Preço',
				name: 'mPreco',
				width: 3,
				options: {
					customBodyRenderLite: (i) => (tabelona[i].mPreco
						? (
							<Tooltip title={new Date(tabelona[i].mPreco[1]).toLocaleString()}>
								<Typography>{numberFormat(tabelona[i].mPreco[0])}</Typography>
							</Tooltip>
						)
						: null
					),
					display: columnsH.mPreco,
				},
			},
			{
				label: 'Menor Preço Data',
				name: 'mPreco',
				width: 150,
				options: {
					customBodyRenderLite: (i) => (tabelona[i].mPreco
						? (
							<Typography>
								{
									new Date(tabelona[i].mPreco[1]).toLocaleString()
								}
							</Typography>
						)
						: null
					),
					display: columnsH.mPrecoD,
				},
			},
			{
				label: 'Preço',
				name: 'preco',
				width: 3,
				options: {
					customBodyRenderLite: (i) => (tabelona[i].preco && tabelona[i].status === 'ok'
						? (
							<Tooltip title={new Date(tabelona[i].preco[1]).toLocaleString()}>
								<Typography>{numberFormat(tabelona[i].preco[0])}</Typography>
							</Tooltip>
						)
						: null
					),
					display: columnsH.preco,
				},
			},
			{
				label: 'Verificado',
				name: 'update',
				width: 3,
				options: {
					customBodyRenderLite: (i) => (
						<Typography>
							{
								new Date(tabelona[i].update).toLocaleString()
							}
						</Typography>
					),
					display: columnsH.update,
				},
			},
		];

		return (
			<>
				<MUIDataTable
					columns={columns}
					data={tabelona}
					options={{
						selectableRowsHeader: false,
						selectableRows: false,
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
