import PropTypes from 'prop-types';

class Variacao {
	Variacao() {
		this._id = PropTypes.string;
		this.nome = PropTypes.string;
	}

	constructor(nome, _id = null) {
		this._id = _id;
		this.nome = nome;
	}
}

export default Variacao;
