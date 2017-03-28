import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import { notification } from 'antd';
import Navigation from '../components/Navigation.jsx';
import Sider from '../components/Sider.jsx';
import styles from '../container/main.less';

const sdk = new WSDK();

class Main extends Component {
	constructor(props) {
		super(props);
	}

	// 在这里登录 IM 服务器
	componentDidMount() {
		var that = this;
		// 当浏览器不支持时，会alert "对不起,当前浏览器不支持聊天,请更换浏览器"
    window.__WSDK__POSTMESSAGE__DEBUG__ = true;
    this.loginImServer();
    // 第一次登录 IM 规律性失败，这里延迟 2 秒登录
    window.setTimeout(function() {
    	that.listenMsgFromServer();
    }, 2000);
	}

	loginImServer() {
		var { mainState, mainActions } = this.props;
		var that = this;

		sdk.Base.login({
			uid : mainState.userInfo.uid,
			appkey : mainState.userInfo.appkey,
			credential : mainState.userInfo.credential,
			success : function(data) {
				console.log('登录成功');
				that.getImUnReaderMsg();
				sdk.Base.startListenAllMsg();
				sdk.Event.on('START_RECEIVE_ALL_MSG', function(data) {
					console.log('接收到的消息');
					console.log(data);
				});
			},
			error : function(e) {
				console.log('登录失败');
				mainActions.addNotification('登录 IM 服务失败，请稍后重试！');
			}
		});
	}

	getImUnReaderMsg() {
		sdk.Base.getUnreadMsgCount({
			count : 100,
			success : function(data) {
				console.log(data);
			},
			error : function(e) {
				console.log('获取未读消息失败');
				console.log(e);
			}
		});

	}

	listenMsgFromServer() {
		var { mainActions } = this.props;
		window.setInterval(function() {
			mainActions.listenerMsgFromServer();
		}, 15000);
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