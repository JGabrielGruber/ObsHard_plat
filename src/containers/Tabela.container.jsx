import React from 'react';

import TabelaComponent from '../components/tabela/Tabela.component';
import ProdutoRepository from '../repositories/Produto.repository';
import LojaRepository from '../repositories/Loja.repository';
import VariacaoRepository from '../repositories/Variacao.repository';
import ModeloRepository from '../repositories/Modelo.repository';
import CategoriaRepository from '../repositories/Categoria.repository';
import ArquiteturaRepository from '../repositories/Arquitetura.repository';
import MarcaRepository from '../repositories/Marca.repository';

class TabelaContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			produtos: [],
			categorias: {},
			arquiteturas: {},
			marcas: {},
			variacoes: {},
			modelos: {},
			lojas: {},
		};
	}

	componentDidMount() {
		ProdutoRepository.syncComplete('produtos', this.handleChange);
		CategoriaRepository.sync('categorias', this.handleList);
		ArquiteturaRepository.sync('arquiteturas', this.handleList);
		MarcaRepository.sync('marcas', this.handleList);
		ModeloRepository.sync('modelos', this.handleList);
		VariacaoRepository.sync('variacoes', this.handleList);
		LojaRepository.sync('lojas', this.handleList);
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

	render() {
		const {
			produtos,
			categorias,
			arquiteturas,
			marcas,
			modelos,
			variacoes,
			lojas,
		} = this.state;

		return (
			<TabelaComponent
				produtos={produtos}
				categorias={categorias}
				arquiteturas={arquiteturas}
				marcas={marcas}
				variacoes={variacoes}
				modelos={modelos}
				lojas={lojas}
			/>
		);
	}
}

export default TabelaContainer;
