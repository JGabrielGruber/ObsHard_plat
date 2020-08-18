import React from 'react';

import ProdutoRepository from '../repositories/Produto.repository';
import DashboardComponent from '../components/dashboard/Dashboard.component';
import LojaRepository from '../repositories/Loja.repository';
import NotificationRepository from '../repositories/Notification.repository';

class DashboardContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			lojas: {},
			notifications: [],
			produtos: {},
		};
	}

	componentDidMount() {
		LojaRepository.sync('lojas', this.handleList);
		NotificationRepository.sync('notifications', this.handleChange);
		ProdutoRepository.sync('produtos', this.handleList);
	}

	handleChange = (key, value, index) => {
		if (index) {
			const ar = this.state[key];
			ar[index] = value || undefined;
			this.setState({
				[key]: ar,
			});
		} else {
			this.setState({
				[key]: value || undefined,
			});
		}
	}

	handleList = (key, value) => {
		const ar = this.state[key];
		value.forEach((item) => {
			ar[item._id] = item;
		});
		this.setState({
			[key]: ar,
		});
	}

	render() {
		const {
			lojas, notifications, produtos,
		} = this.state;

		return (
			<DashboardComponent
				lojas={lojas}
				notifications={notifications}
				produtos={produtos}
			/>
		);
	}
}

export default DashboardContainer;
