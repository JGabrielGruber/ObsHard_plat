import React from 'react';

import Produto from '../components/Produto.component';

import ProdutoRepository from '../repositories/Produto.repository';
import LojaRepository from '../repositories/Loja.repository';
import VariacaoRepository from '../repositories/Variacao.repository';

class ProdutoContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			produtos: [],
			lojas: {},
			variacoes: {},
		};
	}

	componentDidMount() {
		ProdutoRepository.sync('produtos', this.handleChange);
		LojaRepository.sync('lojas', this.handleList);
		VariacaoRepository.sync('variacoes', this.handleList);
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
		ProdutoRepository.add(marca);
	}

	update = (marca) => {
		ProdutoRepository.update(marca);
	}

	delete = (marca) => {
		ProdutoRepository.delete(marca);
	}

	render() {
		const {
			produtos,
			lojas,
			variacoes,
		} = this.state;

		return (
			<Produto
				produtos={produtos}
				actions={{
					onAdd: this.add,
					onUpdate: this.update,
					onDelete: this.delete,
				}}
				lojas={lojas}
				variacoes={variacoes}
			/>
		);
	}
}

export default ProdutoContainer;
