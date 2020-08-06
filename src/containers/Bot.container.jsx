import React from 'react';

import BotComponent from '../components/Bot.component';
import BotRepository from '../repositories/Bot.repository';
import Bot from '../models/Bot.model';

class BotContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			bot: new Bot(0),
		};
	}

	componentDidMount() {
		BotRepository.sync('bot', this.handleChange);
	}

	handleChange = (key, value, index) => {
		if (index) {
			const ar = this.state[key];
			ar[index] = value || undefined;
			this.setState({
				[key]: ar,
			});
		} else {
			this.setState({
				[key]: value || undefined,
			});
		}
	}

	update = (bot) => {
		BotRepository.update(bot);
	}

	render() {
		const {
			bot,
		} = this.state;

		return (
			<BotComponent
				bot={bot}
				actions={{
					onUpdate: this.update,
				}}
			/>
		);
	}
}

export default BotContainer;
