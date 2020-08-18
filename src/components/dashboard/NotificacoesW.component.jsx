import React from 'react';
import {
	TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import NotificationM from '../../models/Notification.model';
import Produto from '../../models/Produto.model';
import Loja from '../../models/Loja.model';

function NotificacoesW({
	lojas, notifications, produtos,
}) {
	const collumns = {
		produto: 'Produto',
		loja: 'Loja/Link',
		preco: 'Preços',
		data: 'Data',
	};

	return (
		<TableContainer>
			<Table stickyHeader size="small">
				<TableHead>
					<TableRow>
						{ Object.keys(collumns).map((k) => <TableCell key={k}>{collumns[k]}</TableCell>) }
					</TableRow>
				</TableHead>
				<TableBody>
					{
						notifications.map((noti, i) => {
							const produto = produtos[noti.key];
							return produto ? (
								<TableRow key={`${i}-${noti.key}`}>
									<TableCell>
										{`${noti.title}`}
									</TableCell>
									<TableCell>
										<Button href={produto.link} color="primary">
											{lojas[produto.loja].nome}
										</Button>
									</TableCell>
									<TableCell>
										{noti.content}
									</TableCell>
									<TableCell component="th" scope="row">
										{new Date((noti.timestamp * 1000)).toLocaleString()}
									</TableCell>
								</TableRow>
							) : null;
						})
					}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

NotificacoesW.defaultProps = {
	lojas: [],
	notifications: [],
	produtos: [],
};

NotificacoesW.propTypes = {
	lojas: PropTypes.objectOf(PropTypes.shape(new Loja().Loja())),
	notifications: PropTypes.arrayOf(PropTypes.shape(new NotificationM().NotificationM())),
	produtos: PropTypes.objectOf(PropTypes.shape(new Produto().Produto())),
};

export default NotificacoesW;
