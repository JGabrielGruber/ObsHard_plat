import React from 'react';

import TabelaComponent from '../components/tabela/Tabela.component';
import LojaRepository from '../repositories/Loja.repository';
import VariacaoRepository from '../repositories/Variacao.repository';
import ModeloRepository from '../repositories/Modelo.repository';
import CategoriaRepository from '../repositories/Categoria.repository';
import ArquiteturaRepository from '../repositories/Arquitetura.repository';
import MarcaRepository from '../repositories/Marca.repository';
import TabelonaRepository from '../repositories/Tabelona.repository';

class TabelaContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tabelona: [],
			categorias: {},
			arquiteturas: {},
			marcas: {},
			variacoes: {},
			modelos: {},
			lojas: {},
		};
	}

	componentDidMount() {
		TabelonaRepository.sync('tabelona', this.handleChange);
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
			ar[item.nome] = item.nome;
		});
		this.setState({
			[key]: ar,
		});
	}

	render() {
		const {
			tabelona,
			categorias,
			arquiteturas,
			marcas,
			modelos,
			variacoes,
			lojas,
		} = this.state;

		return (
			<TabelaComponent
				tabelona={tabelona}
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
