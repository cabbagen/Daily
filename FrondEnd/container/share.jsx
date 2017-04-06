import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from 'antd';
import actions from '../actions';

import FilterFiles from '../components/FilterFiles.jsx';
import FileOperatePanel from '../components/FileOperatePanel.jsx';
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

    var fileOperatePanelProps = {
      currentFileObject : shareState.currentFileObject,
      currentFileContent : shareState.currentFileContent,
      resetEditState : shareState.resetEditState,
      cancelResetEditState : shareActions.cancelResetEditState,
      updateEditFile : that.updateEditFile.bind(that),
      createEditFile : that.createEditFile.bind(that),
      uploadFile : that.uploadFile.bind(that),
      downloadFile : that.downloadFile.bind(that),
      shareFile : that.shareFile.bind(that)
    };
    
    return (
      <div className={styles.share_content}>
        <FilterFiles {...filterFilesProps} />
        <FileOperatePanel {...fileOperatePanelProps} />
      </div>
    );
  }

  createFile() {
    // 这里为空方法，什么都不做, 不可以创建分享文件
  }

  // 请求文件内容
  requireFile(filePath, fileId) {
    var { shareActions } = this.props;
    shareActions.requireFileContent(filePath, fileId);
  }

  // 删除文件
  deleteFile(fileId) {
    var { mainState, mainActions } = this.props;
    mainActions.deleteShareFile(fileId, mainState.currentCategoryId);
  }

  // 更新分享文件
  updateEditFile() {
    alert('分享文件暂不支持保存');
  }

  // 分享文件创建
  createEditFile() {
    alert('分享文件暂不支持保存');
  };

  // 分享文件上传
  uploadFile() {
    alert('分享文件暂不支持上传');
  }

  // 分享文件下载
  downloadFile() {
    var { shareState, shareActions } = this.props;
    window.location.href = `/Home/Files/downloadFile?file_name=${shareState.currentFileObject.file_name}&file_path=${shareState.currentFileObject.file_path}`;
  }

  // 分享文件分享
  shareFile() {
    console.log(`文件id：${fileId},  email: ${email}`);
    var { mainState, mainActions } = this.props;
    mainActions.shareFile({fileId : fileId, email : email});
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