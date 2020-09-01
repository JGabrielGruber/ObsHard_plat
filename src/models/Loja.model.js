import PropTypes from 'prop-types';

class Loja {
	Loja() {
		this._id = PropTypes.string;
		this.nome = PropTypes.string;
		this.tag = PropTypes.string;
		this.propriedade = PropTypes.string;
		this.atributo = PropTypes.string;
		this.buscar = PropTypes.bool;
	}

	constructor(nome, tag, propriedade, atributo, buscar, _id = null) {
		this._id = _id;
		this.nome = nome;
		this.tag = tag;
		this.propriedade = propriedade;
		this.atributo = atributo;
		this.buscar = buscar;
	}
}

export default Loja;
