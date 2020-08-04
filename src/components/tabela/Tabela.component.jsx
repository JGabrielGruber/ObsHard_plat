import React from 'react';
import PropTypes from 'prop-types';

import MaterialTable from 'material-table';

import SearchLookupFilter from './SearchLookupFilter.component';

export default class TabelaComponent extends React.Component {
	constructor() {
		super();

		this.state = {
		};
	}


	render() {
		const {
			tabelona,
		} = this.props;


		const columns = [
			{
				title: 'Categoria',
				field: 'categoria',
				width: 10,
			},
			{
				title: 'Arquitetura',
				field: 'arquitetura',
			},
			{
				title: 'Marca',
				field: 'marca',
				width: 10,
			},
			{
				title: 'Modelo',
				field: 'modelo',
			},
			{
				title: 'Variacao',
				field: 'variacao',
			},
			{
				title: 'Loja',
				field: 'loja',
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
					data={tabelona}
					options={{
						grouping: true,
						filtering: true,
					}}
					title="Produtos"
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
};
