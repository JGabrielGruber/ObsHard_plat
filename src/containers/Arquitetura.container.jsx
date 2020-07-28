import React from 'react';

import Arquitetura from '../components/Arquitetura.component';

import ArquiteturaRepository from '../repositories/Arquitetura.repository';

class ArquiteturaContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			arquiteturas: [],
		};
	}

	componentDidMount() {
		ArquiteturaRepository.sync('arquiteturas', this.handleChange);
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
		ArquiteturaRepository.add(arquitetura);
	}

	update = (arquitetura) => {
		ArquiteturaRepository.update(arquitetura);
	}

	delete = (arquitetura) => {
		ArquiteturaRepository.delete(arquitetura);
	}

	render() {
		const {
			arquiteturas,
		} = this.state;

		return (
			<Arquitetura
				arquiteturas={arquiteturas}
				actions={{
					onAdd: this.add,
					onUpdate: this.update,
					onDelete: this.delete,
				}}
			/>
		);
	}
}

export default ArquiteturaContainer;
