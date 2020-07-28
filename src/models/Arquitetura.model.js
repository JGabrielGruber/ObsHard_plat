import PropTypes from 'prop-types';

class Arquitetura {
	Arquitetura() {
		this._id = PropTypes.string;
		this.nome = PropTypes.string;
		this.ano = PropTypes.number;
	}

	constructor(nome, ano, _id = null) {
		this._id = _id;
		this.nome = nome;
		this.ano = ano;
	}
}

export default Arquitetura;
