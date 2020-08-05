import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { Modal, IconButton, Typography } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

class PrecosModal extends React.Component {
	constructor() {
		super();

		this.state = {
			open: false,
		};
	}

	handleOpen = (open) => {
		this.setState({ open });
	}

	render() {
		const modalStyle = {
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: '800px',
		};

		const {
			data, onChange,
		} = this.props;

		const {
			open,
		} = this.state;


		const numberFormat = (value) => new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(value);

		const columns = [{
			title: 'Preço',
			field: '[0]',
			type: 'currency',
			render: (rowData) => <Typography>{numberFormat(rowData[0])}</Typography>,
		}, {
			title: 'Data',
			field: '[1]',
			type: 'date',
			render: (rowData) => <Typography>{new Date(rowData[0]).toLocaleString()}</Typography>,
		}];

		return (
			<>
				<IconButton aria-label="expand row" size="small" onClick={() => this.handleOpen(!open)}>
					{open ? <VisibilityOffIcon /> : <VisibilityIcon />}
				</IconButton>
				<Modal
					open={open}
					onClose={() => this.handleOpen(false)}
				>
					<MaterialTable
						title="Preços"
						columns={columns}
						data={data}
						editable={onChange ? {
							onRowAdd: (newData) => new Promise((resolve) => {
								setTimeout(() => {
									const old = data || [];
									old.push([newData[0], newData[1]
										? Math.round(newData[1].getTime() / 1000) : null]);
									onChange(old);
									resolve();
								}, 1000);
							}),
							onRowDelete: (oldData) => new Promise((resolve) => {
								setTimeout(() => {
									const old = data;
									old[oldData.tableData.id] = undefined;
									onChange(old);
									resolve();
								}, 1000);
							}),
						} : null}
						style={modalStyle}
					/>
				</Modal>
			</>
		);
	}
}

PrecosModal.defaultProps = {
	data: [],
	onChange: null,
};

PrecosModal.propTypes = {
	data: PropTypes.array,
	onChange: PropTypes.func,
};

export default PrecosModal;
