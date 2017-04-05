import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from 'antd';
import actions from '../actions';

import FilterFiles from '../components/FilterFiles.jsx';
import FileOperatePanel from '../components/FileOperatePanel.jsx';
import styles from '../container/file.less';


class File extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps) {
    var { fileActions, fileState } = nextProps;
    var isShowNotification = fileState.notifications.length > 0 ? true : false;

    if(isShowNotification) {
      this.showNotification(fileState.notifications);
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

  render() {
    var {fileState, mainState, fileActions, mainActions} = this.props;
    var that = this;

    var filterFilesProps = {
      list : mainState.foldersCategoryItem,
      createFile : that.createFile.bind(that),
      requireFile : that.requireFile.bind(that),
      deleteFile : that.deleteFile.bind(that)
    }
    
    return (
      <div className={styles.file_content}>
        <FilterFiles {...filterFilesProps} />
        <FileOperatePanel {...this.props} />
      </div>
    );
  }

  // 重置文件状态
  createFile() {
    var { fileActions } = this.props;
    fileActions.resetState();
  }

  // 请求文件内容
  requireFile(filePath, fileId) {
    var { fileActions } = this.props;
    fileActions.requireFileContent(filePath, fileId); 
  }

  // 删除文件
  deleteFile(fileId) {
    var { mainActions, mainState, fileActions } = this.props;

    mainActions.deleteFile(fileId, mainState.currentCategoryId);
    fileActions.resetState();
  }
}

const mapStateToProps = (state) => {
  return {
    fileState : state.file,
    mainState : state.main
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fileActions : bindActionCreators(actions.fileActions, dispatch),
    mainActions : bindActionCreators(actions.mainActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(File);