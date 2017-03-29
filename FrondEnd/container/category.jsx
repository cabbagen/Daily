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

  openChat(friendId) {
    window.open('/Home/App/chat?friendId=' + friendId, 'chatWindow', 'toolbar=no, status=no, scrollbars=0,resizable=0,menubar＝0,location=0,width=700,height=500');
  }

  deleteFriend(friendId) {
    var { mainActions, mainState, categoryActions } = this.props;

    // 删除好友操作之后，拉取好友列表
    mainActions.deleteFriend({
      friend_id : friendId, 
      from_category_id : mainState.currentCategoryId,
      currentPage : 1,
      pageSize : PAGE_SIZE
    });
  }

  render() {
    var {categoryState, mainState, categoryActions, mainActions} = this.props;
    var that = this;

    var filterCategoryProps = {
      list : mainState.categorysCategoryItem,
      openChat : that.openChat.bind(that),
      deleteFriend : that.deleteFriend.bind(that)
    };
    
    return (
      <div className={styles.category_content}>
        <FileterCategory {...filterCategoryProps} />
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