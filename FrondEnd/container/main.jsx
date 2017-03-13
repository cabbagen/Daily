import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import { notification } from 'antd';
import Navigation from '../components/Navigation.jsx';
import Sider from '../components/Sider.jsx';
import styles from '../container/main.less';


class Main extends Component {
	constructor(props) {
		super(props);
	}

	componentWillUpdate(nextProps) {
		var { mainActions, mainState } = nextProps;
		var isShowNotification = mainState.notifications.length > 0 ? true : false;

		if(isShowNotification) {
			this.showNotification(mainState.notifications);
		}
	}

	showNotification(description) {
		var { mainActions } = this.props;
		notification.open({
			message: '系统通知',
			description: description
		});

		mainActions.removeNotification();
	}

	render() {
		var { mainActions, mainState } = this.props;

		var navigationProps = {
			userMenuInfo : mainState.userMenuInfo,
			userInfo : mainState.userInfo,
			mainActions : mainActions
		};

		var SiderProps = {
			userMenuInfo : mainState.userMenuInfo,
			mainActions : mainActions
		};

		return (
			<div>
				<Navigation {...navigationProps} />
				<div className={styles.main_content}>
					<Sider {...SiderProps} />
					{this.props.children}
				</div>
			</div>
		);
	}


}

const mapStateToProps = (state) => {
	return {
		mainState : state.main
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		mainActions : bindActionCreators(actions.mainActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);