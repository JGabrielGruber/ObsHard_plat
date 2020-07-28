import PropTypes from 'prop-types';
import Marca from './Marca.model';
import Arquitetura from './Arquitetura.model';

class Modelo {
	Modelo() {
		this._id = PropTypes.string;
		this.nome = PropTypes.string;
		this.ano = PropTypes.number;
		this.marca = PropTypes.objectOf(Marca);
		this.arquitetura = PropTypes.objectOf(Arquitetura);
	}

	constructor(nome, ano, marca, arquitetura, _id = null) {
		this._id = _id;
		this.nome = nome;
		this.ano = ano;
		this.marca = marca;
		this.arquitetura = arquitetura;
	}
}

export default Modelo;
