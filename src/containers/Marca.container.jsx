import React from 'react';

import Marca from '../components/Marca.component';

import MarcaRepository from '../repositories/Marca.repository';

class MarcaContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			marcas: [],
		};
	}

	componentDidMount() {
		MarcaRepository.sync('marcas', this.handleChange);
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
		MarcaRepository.add(marca);
	}

	update = (marca) => {
		MarcaRepository.update(marca);
	}

	delete = (marca) => {
		MarcaRepository.delete(marca);
	}

	render() {
		const {
			marcas,
		} = this.state;

		return (
			<Marca
				marcas={marcas}
				actions={{
					onAdd: this.add,
					onUpdate: this.update,
					onDelete: this.delete,
				}}
			/>
		);
	}
}

export default MarcaContainer;
