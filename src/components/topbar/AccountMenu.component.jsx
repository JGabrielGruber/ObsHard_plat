import React from 'react';
import PropTypes from 'prop-types';
import {
	Menu, MenuItem, Divider,
} from '@material-ui/core';

class AccountMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const {
			element, onClose, onAccount, onExit, open,
		} = this.props;

		return (
			<Menu
				id="menu-account"
				anchorEl={element}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={open}
				onClose={onClose}
			>
				<MenuItem onClick={onAccount}>Minha Conta</MenuItem>
				<Divider />
				<MenuItem onClick={onExit}>Sair</MenuItem>
			</Menu>
		);
	}
}

AccountMenu.defaultProps = {
	open: false,
};

AccountMenu.propTypes = {
	onClose: PropTypes.func.isRequired,
	onAccount: PropTypes.func.isRequired,
	onExit: PropTypes.func.isRequired,
	open: PropTypes.bool,
};

export default AccountMenu;
