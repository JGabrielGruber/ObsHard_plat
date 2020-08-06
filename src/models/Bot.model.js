import PropTypes from 'prop-types';

class Bot {
	Bot() {
		this.intervalo = PropTypes.number;
		this.ativo = PropTypes.bool;
		this.status = PropTypes.string;
		this.logs = PropTypes.arrayOf(PropTypes.string);
	}

	constructor(intervalo, ativo = false, status = null, logs = []) {
		this.intervalo = intervalo;
		this.ativo = ativo;
		this.status = status;
		this.logs = logs;
	}
}

export default Bot;
