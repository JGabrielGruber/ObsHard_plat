import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import User from '../../models/User.model';

const useStyles = makeStyles((theme) => ({
	blue: {
		color: theme.palette.getContrastText(blue[500]),
		backgroundColor: blue[500],
	},
}));

export default function AccountAvatar({
	account: {
		displayName,
		photoUrl,
	},
	onClick,
}) {
	const classes = useStyles();

	const avatar = (photoUrl && photoUrl.lenght > 0) || displayName === '' ? (
		<Avatar alt={displayName} src={photoUrl} />
	) : (
		<Avatar alt={displayName} className={classes.blue}>
			{displayName.substring(0, 1)}
		</Avatar>
	);

	return (
		<Tooltip title={displayName} onClick={onClick || null}>
			{onClick ? (
				<IconButton>
					{avatar}
				</IconButton>
			) : (
				<span>
					<IconButton disabled>
						{avatar}
					</IconButton>
				</span>
			)}

		</Tooltip>

	);
}

AccountAvatar.defaultProps = {
	account: {
		displayName: '',
		photoUrl: null,
	},
	onClick: null,
};

AccountAvatar.propTypes = {
	account: PropTypes.shape(User),
	onClick: PropTypes.func,
};
