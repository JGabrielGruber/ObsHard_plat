import React from 'react';

import Arquitetura from '../components/Arquitetura.component';

import ArquiteturaRepository from '../repositories/Arquitetura.repository';
import CategoriaRepository from '../repositories/Categoria.repository';

class ArquiteturaContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			arquiteturas: [],
			categorias: [],
		};
	}

	componentDidMount() {
		ArquiteturaRepository.sync('arquiteturas', this.handleChange);
		CategoriaRepository.sync('categorias', this.handleList);
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
			arquiteturas, categorias,
		} = this.state;

		return (
			<Arquitetura
				arquiteturas={arquiteturas}
				actions={{
					onAdd: this.add,
					onUpdate: this.update,
					onDelete: this.delete,
				}}
				categorias={categorias}
			/>
		);
	}
}

export default ArquiteturaContainer;
