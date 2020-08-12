import PropTypes from 'prop-types';

class NotificationM {
	NotificationM() {
		this.key = PropTypes.string;
		this.title = PropTypes.string;
		this.content = PropTypes.string;
		this.timestamp = PropTypes.number;
		this.notRead = PropTypes.bool;
	}

	constructor(title, content, timestamp = null, notRead = true, key = null) {
		this.key = key;
		this.title = title;
		this.content = content;
		this.timestamp = timestamp;
		this.notRead = notRead;
	}
}

export default NotificationM;
