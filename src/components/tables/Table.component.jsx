import React from 'react';
import MaterialTable from 'material-table';
import icons from './icons';

export default class TableEn extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const { actions, columns, data } = this.props;

		return (
			<MaterialTable
				actions={actions}
				icons={icons}
				columns={columns}
				data={data}
				title="Demo Title"
			/>
		);
	}
}
