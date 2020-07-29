import React from 'react';

import Variacao from '../components/Variacao.component';

import VariacaoRepository from '../repositories/Variacao.repository';

class VariacaoContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			variacoes: [],
			arquiteturas: {},
		};
	}

	componentDidMount() {
		VariacaoRepository.sync('variacoes', this.handleChange);
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

	add = (marca) => {
		VariacaoRepository.add(marca);
	}

	update = (marca) => {
		VariacaoRepository.update(marca);
	}

	delete = (marca) => {
		VariacaoRepository.delete(marca);
	}

	render() {
		const {
			variacoes,
		} = this.state;

		return (
			<Variacao
				variacoes={variacoes}
				actions={{
					onAdd: this.add,
					onUpdate: this.update,
					onDelete: this.delete,
				}}
			/>
		);
	}
}

export default VariacaoContainer;
