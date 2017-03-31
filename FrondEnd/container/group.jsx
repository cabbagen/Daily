import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from 'antd';
import actions from '../actions';

import FilterCategory from '../components/FilterCategory.jsx';
import GroupPanel from '../components/GroupPanel.jsx';
import styles from '../container/group.less';


class Group extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps) {
    var { groupActions, groupState } = nextProps;
    var isShowNotification = groupState.notifications.length > 0 ? true : false;

    if(isShowNotification) {
      this.showNotification(groupState.notifications);
    }
  }

  showNotification(description) {
    var { fileActions } = this.props;
    notification.open({
      message: '系统通知',
      description: description
    });

    fileActions.removeNotification();
  }

  openChat(friendId) {
    // 这里方法留空 不做处理
  }

  deleteFriend(friendId) {
    var { mainState, mainActions } = this.props;
    mainActions.expelTribeMember({
      userId : friendId,
      tribeId : mainState.currentCategoryId
    });
  }

  render() {
    var {fileState, mainState, fileActions, mainActions} = this.props;
    var that = this;

    var filterCategoryProps = {
      list : mainState.groupsCategoryItem,
      openChat : that.openChat.bind(that),
      deleteFriend : that.deleteFriend.bind(that),
    };
    
    return (
      <div className={styles.group_content}>
        <FilterCategory {...filterCategoryProps} />
        <GroupPanel {...this.props} />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    groupState : state.group,
    mainState : state.main
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    groupActions : bindActionCreators(actions.groupActions, dispatch),
    mainActions : bindActionCreators(actions.mainActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);