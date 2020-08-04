import React from 'react';

import TabelaComponent from '../components/tabela/Tabela.component';
import ProdutoRepository from '../repositories/Produto.repository';
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
		};
	}

	componentDidMount() {
		TabelonaRepository.sync('tabelona', this.handleChange);
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

	render() {
		const {
			tabelona,
		} = this.state;

		return (
			<TabelaComponent
				tabelona={tabelona}
			/>
		);
	}
}

export default TabelaContainer;
