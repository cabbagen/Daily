import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Navigation from '../components/Navigation.jsx';
import Sider from '../components/Sider.jsx';
import styles from '../container/main.less';


class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var { mainActions, mainState } = this.props;

		var navigationProps = {
			sendEmailToInviter : mainActions.sendEmailInvitation,
			userInfo : mainState.userInfo
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

	sendEmailInvitation() {
		var { mainActions } = this.props;
		mainActions.sendEmailInvitation('email');
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