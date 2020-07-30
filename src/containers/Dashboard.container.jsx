import React from 'react';

import ProdutoRepository from '../repositories/Produto.repository';
import DashboardComponent from '../components/dashboard/Dashboard.component';

class DashboardContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			produtos: [],
		};
	}

	componentDidMount() {
		ProdutoRepository.sync('produtos', this.handleChange);
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

	render() {
		const {
			produtos,
		} = this.state;

		return (
			<DashboardComponent
				produtos={produtos}
			/>
		);
	}
}

export default DashboardContainer;
