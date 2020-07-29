import React from 'react';
import PropTypes from 'prop-types';

import { IconButton, Tooltip, Badge } from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

export default function Notification({
	amount,
	onClick,
}) {
	return (
		<Tooltip title="Notificações" onClick={onClick}>
			<IconButton color="inherit">
				{
					amount > 0 ? (
						<Badge max={9} badgeContent={amount} color="error">
							<NotificationsNoneIcon fontSize="large" />
						</Badge>
					) : (
						<NotificationsNoneIcon fontSize="large" />
					)
				}
			</IconButton>
		</Tooltip>

	);
}

Notification.defaultProps = {
	amount: 0,
	onClick: null,
};

Notification.propTypes = {
	amount: PropTypes.number,
	onClick: PropTypes.func,
};
