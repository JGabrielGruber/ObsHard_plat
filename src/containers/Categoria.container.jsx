import React from 'react';

import Categoria from '../components/Categoria.component';

import CategoriaRepository from '../repositories/Categoria.repository';

class CategoriaContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			categorias: [],
			arquiteturas: {},
		};
	}

	componentDidMount() {
		CategoriaRepository.sync('categorias', this.handleChange);
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
		CategoriaRepository.add(marca);
	}

	update = (marca) => {
		CategoriaRepository.update(marca);
	}

	delete = (marca) => {
		CategoriaRepository.delete(marca);
	}

	render() {
		const {
			categorias,
		} = this.state;

		return (
			<Categoria
				categorias={categorias}
				actions={{
					onAdd: this.add,
					onUpdate: this.update,
					onDelete: this.delete,
				}}
			/>
		);
	}
}

export default CategoriaContainer;
