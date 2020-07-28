import PropTypes from 'prop-types';
import Modelo from './Modelo';

class Variacao {
	Variacao() {
		this._id = PropTypes.string;
		this.nome = PropTypes.string;
		this.modelo = PropTypes.objectOf(Modelo);
	}

	constructor(nome, modelo, _id = null) {
		this._id = _id;
		this.nome = nome;
		this.modelo = modelo;
	}
}

export default Variacao;
