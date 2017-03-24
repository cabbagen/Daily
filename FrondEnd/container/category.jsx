import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from 'antd';
import actions from '../actions';

import FileterCategory from '../components/FilterCategory.jsx';
import CategoryPanel from '../components/CategoryPanel.jsx';
import styles from './category.less';

const PAGE_SIZE = 6;

class Category extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		var { categoryState, categoryActions } = this.props;
		if(categoryState.currentUserList === null) {
			categoryActions.requireUserForAddFriendList({
				currentPage : 1,
				pageSize : PAGE_SIZE
			});
		}
	}

	componentWillUpdate(nextProps) {
		var { categoryActions, categoryState } = nextProps;
		var isShowNotification = categoryState.notifications.length > 0 ? true : false;

		if(isShowNotification) {
			this.showNotification(categoryState.notifications);
		}
	}

	showNotification(description) {
		var { categoryActions } = this.props;
		notification.open({
			message: '系统通知',
			description: description
		});

		categoryActions.removeNotification();
	}

	render() {
		var {categoryState, mainState, categoryActions, mainActions} = this.props;
		
		return (
			<div className={styles.category_content}>
				<FileterCategory {...this.props} />
				<CategoryPanel {...this.props} />
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		categoryState : state.category,
		mainState : state.main
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		categoryActions : bindActionCreators(actions.categoryActions, dispatch),
		mainActions : bindActionCreators(actions.mainActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);