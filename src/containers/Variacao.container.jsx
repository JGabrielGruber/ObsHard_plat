import React from 'react';

import Variacao from '../components/Variacao.component';

import VariacaoRepository from '../repositories/Variacao.repository';
import ModeloRepository from '../repositories/Modelo.repository';

class VariacaoContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			variacoes: [],
			arquiteturas: {},
			modelos: {},
		};
	}

	componentDidMount() {
		VariacaoRepository.sync('variacoes', this.handleChange);
		ModeloRepository.sync('modelos', this.handleList);
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
		value.forEach(item => {
			ar[item._id] = item.nome;
		});
		this.setState({
			[key]: ar,
		});
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
			modelos,
		} = this.state;

		return (
			<Variacao
				variacoes={variacoes}
				actions={{
					onAdd: this.add,
					onUpdate: this.update,
					onDelete: this.delete,
				}}
				modelos={modelos}
			/>
		);
	}
}

export default VariacaoContainer;
