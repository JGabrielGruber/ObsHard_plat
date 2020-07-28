import React from 'react';

import Loja from '../components/Loja.component';

import LojaRepository from '../repositories/Loja.repository';

class LojaContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			lojas: [],
		};
	}

	componentDidMount() {
		LojaRepository.sync('lojas', this.handleChange);
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

	add = (arquitetura) => {
		LojaRepository.add(arquitetura);
	}

	update = (arquitetura) => {
		LojaRepository.update(arquitetura);
	}

	delete = (arquitetura) => {
		LojaRepository.delete(arquitetura);
	}

	render() {
		const {
			lojas,
		} = this.state;

		return (
			<Loja
				lojas={lojas}
				actions={{
					onAdd: this.add,
					onUpdate: this.update,
					onDelete: this.delete,
				}}
			/>
		);
	}
}

export default LojaContainer;
