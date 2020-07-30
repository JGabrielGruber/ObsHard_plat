import PropTypes from 'prop-types';
import Loja from './Loja.model';
import Variacao from './Variacao.model';
import Modelo from './Modelo.model';

class Produto {
	Produto() {
		this._id = PropTypes.string;
		this.link = PropTypes.string;
		this.status = PropTypes.string;
		this.review = PropTypes.string;
		this.precos = PropTypes.array;
		this.loja = PropTypes.objectOf(Loja);
		this.variacao = PropTypes.objectOf(Variacao);
		this.modelo = PropTypes.objectOf(Modelo);
	}

	constructor(link, status, review, precos, loja, variacao, modelo, _id = null) {
		this._id = _id;
		this.link = link;
		this.status = status;
		this.review = review;
		this.precos = precos;
		this.loja = loja;
		this.modelo = modelo;
		this.variacao = variacao;
	}
}

export default Produto;
