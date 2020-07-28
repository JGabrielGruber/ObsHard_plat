import React from 'react';

import Modelo from '../components/Modelo.component';

import ModeloRepository from '../repositories/Modelo.repository';
import ArquiteturaRepository from '../repositories/Arquitetura.repository';
import MarcaRepository from '../repositories/Marca.repository';

class ModeloContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modelos: [],
			arquiteturas: {},
			marcas: {},
		};
	}

	componentDidMount() {
		ModeloRepository.sync('modelos', this.handleChange);
		ArquiteturaRepository.sync('arquiteturas', this.handleList);
		MarcaRepository.sync('marcas', this.handleList);
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
		ModeloRepository.add(marca);
	}

	update = (marca) => {
		ModeloRepository.update(marca);
	}

	delete = (marca) => {
		ModeloRepository.delete(marca);
	}

	render() {
		const {
			modelos,
			arquiteturas,
			marcas,
		} = this.state;

		return (
			<Modelo
				modelos={modelos}
				actions={{
					onAdd: this.add,
					onUpdate: this.update,
					onDelete: this.delete,
				}}
				arquiteturas={arquiteturas}
				marcas={marcas}
			/>
		);
	}
}

export default ModeloContainer;
