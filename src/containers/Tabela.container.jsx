import React from 'react';

import TabelaComponent from '../components/tabela/Tabela.component';

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
		value.forEach((item) => {
			ar[item.nome] = item.nome;
		});
		this.setState({
			[key]: ar,
		});
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
