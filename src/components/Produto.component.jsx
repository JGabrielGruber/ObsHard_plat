import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import {
	TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import icons from './icons';
import Produto from '../models/Produto.model';
import Loja from '../models/Loja.model';
import Variacao from '../models/Variacao.model';
import Modelo from '../models/Modelo.model';
import PrecosModal from './PrecosModal.component';

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
			{
				title: 'Modelo',
				field: 'modelo',
				lookup: modelos,
				editComponent: (props) => (
					<Autocomplete
						options={Object.keys(modelos)}
						getOptionLabel={(option) => option}
						style={{ width: 200 }}
						renderOption={(option) => (
							<>
								{modelos[option]}
							</>
						)}
						filterOptions={
							(options, { inputValue }) => Object.keys(modelos).filter((i) => (
								modelos[i].includes(inputValue)
							))
						}
						renderInput={(params) => <TextField {...params} />}
						defaultValue={props.value}
						onInputChange={(e, v) => {
							props.onChange(v);
						}}
					/>
				),
			},
			{
				title: 'Variacao',
				field: 'variacao',
				lookup: variacoes,
				editComponent: (props) => (
					<Autocomplete
						options={Object.keys(variacoes)}
						getOptionLabel={(option) => option}
						style={{ width: 200 }}
						renderOption={(option) => (
							<>
								{variacoes[option]}
							</>
						)}
						filterOptions={
							(options, { inputValue }) => Object.keys(variacoes).filter((i) => (
								variacoes[i].includes(inputValue)
							))
						}
						renderInput={(params) => <TextField {...params} />}
						defaultValue={props.value}
						onInputChange={(e, v) => {
							props.onChange(v);
						}}
					/>
				),
			},
			{
				title: 'Link', field: 'link', type: 'string', width: 100,
			},
			{ title: 'Review', field: 'review' },
			{
				title: 'Status', field: 'status', lookup: { ok: 'ok' }, hidden: true,
			},
			{
				title: 'Preços',
				field: 'precos',
				render: (rowData) => <PrecosModal data={rowData.precos} />,
				editComponent: (props) => <PrecosModal data={props.value} onChange={props.onChange} />,
			},
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

ProdutoComponent.propTypes = {
	produtos: PropTypes.arrayOf(PropTypes.shape(new Produto().Produto())).isRequired,
	actions: PropTypes.shape({
		onAdd: PropTypes.func,
		onUpdate: PropTypes.func,
		onDelete: PropTypes.func,
	}).isRequired,
	lojas: PropTypes.shape(new Loja().Loja()).isRequired,
	variacoes: PropTypes.shape(new Variacao().Variacao()).isRequired,
	modelos: PropTypes.shape(new Modelo().Modelo()).isRequired,
};
