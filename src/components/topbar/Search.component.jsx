import React from 'react';
import PropTypes from 'prop-types';
import {
	InputBase, IconButton, withStyles, Tooltip, Grid,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const styles = (theme) => ({
	root: {
		display: 'flex',
	},
	input: {
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '0ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
});

class Search extends React.Component {
	constructor(props) {
		super(props);

		this.textInput = React.createRef();
		this.focusTextInput = this.focusTextInput.bind(this);
	}

	focusTextInput() {
		this.textInput.current.focus();
	}

	render() {
		const { classes, onChange } = this.props;

		return (
			<Grid className={classes.root}>
				<InputBase
					classes={{
						input: classes.input,
					}}
					inputRef={this.textInput}
					placeholder="Procurar…"
					inputProps={{ 'aria-label': 'search' }}
					onChange={onChange}
				/>
				<Tooltip onClick={this.focusTextInput} title="Procurar">
					<IconButton>
						<SearchIcon fontSize="large" />
					</IconButton>
				</Tooltip>
			</Grid>
		);
	}
}

Search.defaultProps = {
	onChange: null,
};

Search.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	classes: PropTypes.object.isRequired,
	onChange: PropTypes.func,
};

export default withStyles(styles)(Search);
