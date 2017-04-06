import React, { Component, PropTypes } from 'react';
import { Icon, Button, Modal } from 'antd';

import styles from './GroupPanel.less';

var editor = null;

class GroupPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible : false,
      modalErrorMsg : '',
      isShowCreateTribeFileModal : false,
      modalNewFileErrorMsg : '',
      tribeAdminInfo : this.props.groupState.tribeAdminInfo,
      tribeFiles : this.props.groupState.currentTribeFiles,
      tribeFileContent : this.props.groupState.tribeFileContent,
      tribeFileObject : this.props.groupState.tribeFileObject,
      isEditState : false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.groupState.tribeAdminInfo && nextProps.groupState.currentTribeFiles) {
      this.setState({
        tribeAdminInfo : nextProps.groupState.tribeAdminInfo,
        tribeFiles : nextProps.groupState.currentTribeFiles,
        tribeFileContent : nextProps.groupState.tribeFileContent,
        tribeFileObject : nextProps.groupState.tribeFileObject,
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    var { groupActions } = this.props;
    if(nextProps.groupState.isGetInitTribeFileContent) {
      if(editor) {
        editor.setValue(nextProps.groupState.tribeFileContent);
      }
      groupActions.resetGetInitTribeFileContent();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var { isEditState, tribeFileContent } = this.state;
    if(isEditState && !editor) {
      editor = new Simditor({textarea : $('#tribeFileEditor')});
    }
  }

  render() {
    var that = this;
    var { tribeAdminInfo, tribeFiles, isEditState } = this.state;
    var nickname = tribeAdminInfo && tribeAdminInfo.nickname || '';
    var fileContent = isEditState ? (
      <textarea ref="tribeFileEditor" id="tribeFileEditor" placeholder="开始写群文件"></textarea>
    ) : (tribeFiles ? this.renderFiles(tribeFiles) : this.renderFiles());

    return (
      <div className={styles.group_panel}>
        <div className={styles.group_panel_header}>
          <p className={styles.chargeman}>组长: {nickname}</p>
          <p className={styles.panel_operate}>
            <Icon title="保存文件" type="hdd" onClick={that.saveTribeFile.bind(that)} />
            <Icon title="新建群文件" type="file-add" onClick={that.createTribeFile.bind(that)} />
            <Icon title="下载群文件" type="download" onClick={that.downloadTribeFile.bind(that)} />
            <Icon title="删除群文件" type="delete" onClick={that.deleteTribeFile.bind(that)} />
            <Button onClick={that.inviteTribe.bind(that)}>邀请</Button>
            <Button onClick={that.leaveTribe.bind(that)}>退群</Button>
            <Button onClick={that.deleteTribe.bind(that)}>解散群</Button>
            <Button onClick={that.changeTribeFiles.bind(that)}>群文件</Button>
            <Button onClick={that.openTribeChat.bind(that)}>群聊天</Button>
          </p>
        </div>
        <div className={styles.group_panel_content}>
          {fileContent}
        </div>
        <Modal title="邀请入群" 
          visible={this.state.visible} 
          onOk={this.inviteAddTribeModalOk.bind(this)} 
          onCancel={this.inviteAddTribeModalCancel.bind(this)}>
            <p>请输入对方的 Email</p>
            <input className={styles.email} type="email" required="required" ref="email" />
            {this.state.modalErrorMsg.length > 0 ? <p className={styles.error}>{this.state.modalErrorMsg}</p> : ''}
        </Modal>
        <Modal title="保存群文件"
          visible={this.state.isShowCreateTribeFileModal}
          onOk={this.saveNewTribeFile.bind(this)}
          onCancel={this.cancelSaveNewTribeFile.bind(this)}>
            <p>请输入文件名称</p>
            <input className={styles.email} type="text" required="required" ref="newTribeFile" />
            {this.state.modalNewFileErrorMsg.length > 0 ? <p className={styles.error}>{this.state.modalNewFileErrorMsg}</p> : ''}
        </Modal>
      </div>
    );
  }

  renderFiles(tribeFiles = []) {
    var that = this;
    var nodes = tribeFiles.map(file => {
      return file.isSelected ? (
        <li key={file.id} 
          className={styles.fileSelected} 
          onClick={that.cancelSelectFile.bind(that, file.id)}
          onDoubleClick={that.openTribeFile.bind(that, file.file_path, file.id)}>
            <div className={styles.file}>
              <Icon type="file-text" />
              <p>{file.file_name}</p>
            </div>
            <div className={styles.selected}>
              <div><span></span></div>
            </div>
        </li>
      ) : (
        <li key={file.id} 
          onClick={that.selecteFile.bind(that, file.id)} 
          onDoubleClick={that.openTribeFile.bind(that, file.file_path, file.id)}>
            <div className={styles.file}>
              <Icon type="file-text" />
              <p>{file.file_name}</p>
            </div>
        </li>
      );
    });

    return (
      <ul className={styles.files}>
        {nodes}
      </ul>
    );
  }

  cancelSelectFile(fileId) {
    var newTribeFiles = this.state.tribeFiles.map(file => {
      if(file.id === fileId) {
        delete file.isSelected;
      }
      return file;
    });
    this.setState({tribeFiles : newTribeFiles});
  }

  selecteFile(fileId) {
    var newTribeFiles = this.state.tribeFiles.map(file => {
      if(file.id === fileId) {
        file.isSelected = true;
      }
      return file;
    });
    this.setState({tribeFiles : newTribeFiles});
  }

  openTribeFile(tribeFilePath, tribeFileId) {
    var { groupActions } = this.props;
    this.setState({isEditState:true}, function() {
      groupActions.getTribeFileContent(tribeFilePath, tribeFileId);
    });
  }

  saveTribeFile() {
    var { tribeFileObject, isEditState } = this.state;
    var { mainState } = this.props;

    if(!isEditState) {
      // 如果文件未处在编辑状态，则提示不能保存
      alert('请编辑之后在进行保存！');
      return;
    } else {
      // 如果文件处在编辑状态，则需按照是否为新建文件进行保存处理
      if(tribeFileObject) {
        this.handleSaveTribeFile({
          fileId : tribeFileObject.id,
          fileName : tribeFileObject.file_name,
          fileContent : editor.getValue(),
          tribeId : mainState.currentCategoryId
        })
      } else {
        this.setState({isShowCreateTribeFileModal : true});
      }
    }

    console.log('保存群文件');
  }

  handleSaveTribeFile(params) {
    var { groupActions } = this.props;
    groupActions.saveTribeFile(params);
    // 处理保存群文件
  }

  createTribeFile() {
    var { groupActions } = this.props;
    this.changeTribeFiles();
    this.setState({isEditState : true}, function() {
      groupActions.createTribeFile();
    });
  }

  downloadTribeFile() {
    var { groupActions } = this.props;
    var fileIds = this.state.tribeFiles.filter(file => file.isSelected).map(file => file.id);
    var params = [];

    fileIds.forEach(fileId => {
      params.push('fileIds[]=' + fileId);
    });

    if(fileIds.length === 0) {
      alert('你需要先选择文件！');
      return;
    } else {
      window.location.href = '/Home/Group/downloadTribeFiles?' + params.join('&');
    }
    
  }

  deleteTribeFile() {
    var { groupActions, mainState } = this.props;
    var fileIds = this.state.tribeFiles.filter(file => file.isSelected).map(file => file.tribe_id);

    if(fileIds.length === 0) {
      alert('请先选择文件在进行删除！');
      return;
    } else {
      groupActions.deleteTribeFiles(fileIds, mainState.currentCategoryId); 
    }

  }

  inviteTribe() {
    this.setState({visible:true});
  }

  leaveTribe() {
    var { mainState, mainActions } = this.props;
    var tribeId = mainState.currentCategoryId;
    
    mainActions.leaveTribe(tribeId);
  }

  deleteTribe() {
    var { mainState, mainActions } = this.props;
    var tribeId = mainState.currentCategoryId;

    mainActions.deleteTribe(tribeId);
  }

  changeTribeFiles() {
    var { groupActions, mainState } = this.props;
    // 删除编辑器
    if(editor) {
      editor.destroy();
      editor = null;
    }
    this.setState({isEditState:false}, function() {
      groupActions.getTribeFiles(mainState.currentCategoryId);
    });
  }

  openTribeChat() {
    console.log('打开群聊窗口');
  }

  inviteAddTribeModalOk() {
    var email = this.refs.email.value;
    var isPassCheck = this.checkEmail();
    var { mainState, mainActions } = this.props;

    if(isPassCheck) {
      this.setState({visible : false, modalErrorMsg : ''}, function() {
        mainActions.inviteJoinTribe({
          email : email,
          imTribeId : mainState.currentCategoryId
        });
      });
    }
  }

  inviteAddTribeModalCancel() {
    this.setState({visible : false, modalErrorMsg : ''});
  }

  checkEmail() {
    var emailReg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/,
      inputEmail = this.refs.email.value;

    if(inputEmail.length == 0) {
      this.setState({modalErrorMsg : '邮箱地址不能为空！'});
      return false;
    }

    if(!emailReg.test(inputEmail)) {
      this.setState({modalErrorMsg : '请输入合法的邮箱地址哦！'});
      return false;
    }

    return true;
  }

  saveNewTribeFile() {
    var isPassCheck = this.checkFileName();
    var fileName = this.refs.newTribeFile.value;
    var { mainState } = this.props;
    var that = this;

    if(isPassCheck) {
      // 创建群文件处理
      this.setState({isShowCreateTribeFileModal : false}, function() {
        that.handleSaveTribeFile({
          fileName : fileName,
          fileContent : editor.getValue(),
          tribeId : mainState.currentCategoryId
        });
      })
    }
  }

  cancelSaveNewTribeFile() {
    this.setState({isShowCreateTribeFileModal : false, modalNewFileErrorMsg : ''});
  }

  checkFileName() {
    var inputFileName = this.refs.newTribeFile.value;
    var blankReg = /\s+/;
    
    if(inputFileName.length === 0) {
      this.setState({modalNewFileErrorMsg : '文件名称不能为空！'});
      return false;
    }

    if(blankReg.test(inputFileName)) {
      this.setState({modalNewFileErrorMsg : '文件名称不能包含空格！'});
      return false;
    }

    return true;
  } 

}

export default GroupPanel;