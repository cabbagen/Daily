import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from 'antd';
import actions from '../actions';

import FilterFiles from '../components/FilterFiles.jsx';
import styles from '../container/share.less';


class Share extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps) {
    var { shareActions, shareState } = nextProps;
    var isShowNotification = shareState.notifications.length > 0 ? true : false;

    if(isShowNotification) {
      this.showNotification(shareState.notifications);
    }
  }

  showNotification(description) {
    var { shareActions } = this.props;
    notification.open({
      message: '系统通知',
      description: description
    });

    shareActions.removeNotification();
  }

  render() {
    var {shareState, mainState, shareActions, mainActions} = this.props;
    var that = this;

    var filterFilesProps = {
      list : mainState.sharesCategoryItem,
      createFile : that.createFile.bind(that),
      requireFile : that.requireFile.bind(that),
      deleteFile : that.deleteFile.bind(that)
    };
    
    return (
      <div className={styles.share_content}>
        <FilterFiles {...filterFilesProps} />
      </div>
    );
  }

  createFile() {
    // 这里为空方法，什么都不做
  }

  requireFile(filePath, fileId) {
    console.log(filePath + ' || ' + fileId);
    console.log('请求文件内容');
  }

  deleteFile(fileId) {
    var { mainState, mainActions } = this.props;
    mainActions.deleteShareFile(fileId, mainState.currentCategoryId);
  }

}

const mapStateToProps = (state) => {
  return {
    shareState : state.share,
    mainState : state.main
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    shareActions : bindActionCreators(actions.shareActions, dispatch),
    mainActions : bindActionCreators(actions.mainActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Share);