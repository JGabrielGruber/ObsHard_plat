import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
	Grid, Paper, Typography, Link, withStyles, makeStyles,
} from '@material-ui/core';
import {
	MuiPickersUtilsProvider, DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WarningIcon from '@material-ui/icons/Warning';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import {
	BarChart, Bar, LabelList, ResponsiveContainer,
} from 'recharts';
import Produto from '../../models/Produto.model';
import Loja from '../../models/Loja.model';
import NotificationM from '../../models/Notification.model';
import NotificacoesW from './NotificacoesW.component';
import Bot from '../../models/Bot.model';

const styles = (theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: theme.spacing(40.5),
	},
	indicators: {
		alignItems: 'center',
		height: theme.spacing(10),
	},
	calendar: {
		height: theme.spacing(38),
	},
	icon: {
		fontSize: theme.typography.fontSize.valueOf() * 2.2,
		flex: 1,
	},
	bar: {
		fill: theme.palette.primary.light,
	},
});

const useStyle = makeStyles((theme) => ({
	label: {
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		fill: theme.palette.text.primary,
	},
}));

const BotIcon = ({ ...pr }) => {
	switch ('a') {
	default:
		return (<HourglassFullIcon {...pr} />);
	}
};

const CustomLabel = ({
	x, y, width, height, value,
}) => {
	const classes = useStyle();
	return (
		<g>
			<text x={x + width / 2} y={y - (height * 0.05)} textAnchor="middle" dominantBaseline="middle" className={classes.label}>
				{value}
			</text>
		</g>
	);
};

class DashboardComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			notificacoes: [],
		};
	}

	componentDidMount() {
		this.handleDate(new Date());
	}

	handleDate = (newDate) => {
		const {
			notifications,
		} = this.props;
		this.setState({
			date: newDate,
			notificacoes: notifications.filter(
				(i) => new Date(i.timestamp * 1000).getDate() === newDate.getDate(),
			),
		});
	}

	render() {
		const {
			produtos, bot, lojas, classes,
		} = this.props;
		const {
			date, notificacoes,
		} = this.state;
		const fixedHeightTable = clsx(classes.paper, classes.fixedHeight);
		const indicators = clsx(classes.paper, classes.indicators);
		const calendar = clsx(classes.paper, classes.calendar);
		return (
			<Grid container direction="row" spacing={4}>
				<Grid item xs={12} lg={8}>
					<Grid container spacing={4}>
						<Grid item xs={6} md={4} lg={3}>
							<Link href="#/produtos">
								<Paper className={indicators}>
									<ShoppingCartIcon className={classes.icon} />
									<Typography variant="h6">
										{Object.keys(produtos).length}
									</Typography>
									<Typography variant="caption">
										Produtos
									</Typography>
								</Paper>
							</Link>
						</Grid>
						<Grid item xs={6} md={4} lg={3}>
							<Paper className={indicators}>
								<TrendingUpIcon className={classes.icon} />
								<Typography variant="h6">
									{notificacoes.length}
								</Typography>
								<Typography variant="caption">
									Alterações
								</Typography>
							</Paper>
						</Grid>
						<Grid item xs={6} md={4} lg={3}>
							<Link href="#/bot">
								<Paper className={indicators}>
									<WarningIcon className={classes.icon} />
									<Typography variant="h6">
										{bot.logs ? bot.logs.length : 0}
									</Typography>
									<Typography variant="caption">
										Erros
									</Typography>
								</Paper>
							</Link>
						</Grid>
						<Grid item xs={6} md={4} lg={3}>
							<Link href="#/bot">
								<Paper className={indicators}>
									<BotIcon className={classes.icon} />
									<Typography variant="caption">
										Status do bot
									</Typography>
								</Paper>
							</Link>
						</Grid>
						<Grid item xs={12} md={12} lg={12}>
							<Paper className={fixedHeightTable}>
								<Typography component="h2" variant="h6" color="primary" gutterBottom>
									Alterações
								</Typography>
								<NotificacoesW lojas={lojas} notifications={notificacoes} produtos={produtos} />
							</Paper>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} lg={4}>
					<Grid container spacing={4}>
						<Grid item xs={12} md={12} lg={12}>
							<Paper className={calendar}>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<DatePicker
										autoOk
										ToolbarComponent={() => <div />}
										variant="static"
										openTo="date"
										value={date}
										onChange={this.handleDate}
									/>
								</MuiPickersUtilsProvider>
							</Paper>
						</Grid>
						<Grid item xs={12} md={12} lg={12}>
							<Paper className={calendar}>
								<ResponsiveContainer>
									<BarChart
										data={[
											{
												name: 'Produto A',
												uv: 4000,
												pv: 2400,
												amt: 2400,
											},
											{
												name: 'Produto B',
												uv: 3000,
												pv: 1398,
												amt: 2210,
											},
										]}
										margin={{
											top: 30, bottom: 5,
										}}
									>
										<Bar dataKey="pv" className={classes.bar} isAnimationActive={false}>
											<LabelList dataKey="name" position="top" content={CustomLabel} />
										</Bar>
									</BarChart>
								</ResponsiveContainer>
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

DashboardComponent.defaultProps = {
	lojas: [],
	notifications: [],
	produtos: [],
	bot: {},
};

DashboardComponent.propTypes = {
	lojas: PropTypes.objectOf(PropTypes.shape(new Loja().Loja())),
	notifications: PropTypes.arrayOf(PropTypes.shape(new NotificationM().NotificationM())),
	produtos: PropTypes.objectOf(PropTypes.shape(new Produto().Produto())),
	bot: PropTypes.shape(new Bot().Bot()),
};

export default withStyles(styles, { withTheme: true })(DashboardComponent);
