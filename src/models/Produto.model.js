import PropTypes from 'prop-types';
import Loja from './Loja.model';
import Variacao from './Variacao.model';

class Produto {
	Produto() {
		this._id = PropTypes.string;
		this.link = PropTypes.string;
		this.status = PropTypes.string;
		this.precos = PropTypes.array;
		this.loja = PropTypes.objectOf(Loja);
		this.variacao = PropTypes.objectOf(Variacao);
	}

	constructor(link, status, precos, loja, variacao, _id = null) {
		this._id = _id;
		this.link = link;
		this.status = status;
		this.precos = precos;
		this.loja = loja;
		this.variacao = variacao;
	}
}

export default Produto;
