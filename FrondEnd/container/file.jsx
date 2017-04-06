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
    
    var fileOperatePanelProps = {
      currentFileObject : fileState.currentFileObject,
      currentFileContent : fileState.currentFileContent,
      resetEditState : fileState.resetEditState,
      cancelResetEditState : fileActions.cancelResetEditState,
      updateEditFile : that.updateEditFile.bind(that),
      createEditFile : that.createEditFile.bind(that),
      uploadFile : that.uploadFile.bind(that),
      downloadFile : that.downloadFile.bind(that),
      shareFile : that.shareFile.bind(that)
    };


    return (
      <div className={styles.file_content}>
        <FilterFiles {...filterFilesProps} />
        <FileOperatePanel {...fileOperatePanelProps} />
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

  // 更新文件
  updateEditFile(fileName, fileContent) {
    var { fileState, mainActions, mainState, fileActions } = this.props;
    var that = this;

    var params = Object.assign({}, fileState.currentFileObject, {
      fileContent : fileContent,
      file_name : fileName
    });

    if(params.file_name.length === 0) {
      alert('请输入文件名称再保存');
      return;
    }

    mainActions.updateFile(params);
    fileActions.requireFileContent(fileState.currentFileObject.file_path, fileState.currentFileObject.id);
  }

  // 创建文件
  createEditFile(fileName, fileContent) {
    var { mainState, mainActions, fileActions } = this.props;
    var that = this;
    
    var params = {
      fileContent : fileContent,
      file_name : fileName,
      from_folder_id : mainState.currentCategoryId
    };

    if(params.file_name.length === 0) {
      alert('请输入文件名称再保存');
      return;
    }

    mainActions.createFile(params);
    fileActions.resetState();
  }

  // 上传文件
  uploadFile(input) {
    var formData = new FormData();
    var { mainState, fileActions } = this.props;

    if(mainState.currentCategoryId.length === 0) {
      alert('请先选择文件夹再上传文件');
      return;
    }

    if(path.extname(input.value) !== '.md') {
      alert('请传入 .md 的markdown 文件');
      return;
    }

    if(input.value.length !== 0) {
      formData.append('file', input.files[0]);
      formData.append('from_folder_id', mainState.currentCategoryId);

      fileActions.uploadFile(formData);
    }
  }

  // 下载文件
  downloadFile() {
    var { fileState, fileActions } = this.props;
    window.location.href = `/Home/Files/downloadFile?file_name=${fileState.currentFileObject.file_name}&file_path=${fileState.currentFileObject.file_path}`;
  }

  // 分享文件
  shareFile(fileId, email) {
    console.log(`文件id：${fileId},  email: ${email}`);
    var { mainState, mainActions } = this.props;
    mainActions.shareFile({fileId : fileId, email : email});
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