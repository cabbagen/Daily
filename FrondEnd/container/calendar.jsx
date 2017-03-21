import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from 'antd';
import actions from '../actions';

import FilterCalendar from '../components/FilterCalendar.jsx';
import CalendarPanel from '../components/CalendarPanel.jsx';
import styles from '../container/calendar.less';


class Calendar extends Component {
	constructor(props) {
		super(props);
	}

	componentWillUpdate(nextProps) {
		var { calendarActions, calendarState } = nextProps;
		var isShowNotification = calendarState.notifications.length > 0 ? true : false;

		if(isShowNotification) {
			this.showNotification(calendarState.notifications);
		}
	}

	showNotification(description) {
		var { calendarActions } = this.props;
		notification.open({
			message: '系统通知',
			description: description
		});

		calendarActions.removeNotification();
	}

	render() {
		var {calendarState, mainState, calendarActions, mainActions} = this.props;
		
		return (
			<div className={styles.calendar_content}>
				<FilterCalendar {...this.props} />
				<CalendarPanel {...this.props}/>
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		calendarState : state.calendar,
		mainState : state.main
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		calendarActions : bindActionCreators(actions.calendarActions, dispatch),
		mainActions : bindActionCreators(actions.mainActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);