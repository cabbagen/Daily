import React, { Component, PropTypes } from 'react';
import { Icon, Button, Modal } from 'antd';

import styles from './GroupPanel.less';

class GroupPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible : false,
      modalErrorMsg : '',
      tribeAdminInfo : this.props.groupState.tribeAdminInfo,
      tribeFiles : this.props.groupState.currentTribeFiles
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.groupState.tribeAdminInfo && nextProps.groupState.currentTribeFiles) {
      this.setState({
        tribeAdminInfo : nextProps.groupState.tribeAdminInfo,
        tribeFiles : nextProps.groupState.currentTribeFiles
      });
    }
  }

  render() {
    var that = this;
    var { tribeAdminInfo, tribeFiles } = this.state;
    var nickname = tribeAdminInfo && tribeAdminInfo.nickname || '';
    var fileContent = tribeFiles ? this.renderFiles(tribeFiles) : this.renderFiles();

    return (
      <div className={styles.group_panel}>
        <div className={styles.group_panel_header}>
          <p className={styles.chargeman}>组长: {nickname}</p>
          <p className={styles.panel_operate}>
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
            <input placeholder="请输入对方的 Email" className={styles.email} type="email" required="required" ref="email" />
            {this.state.modalErrorMsg.length > 0 ? <p className={styles.error}>{this.state.modalErrorMsg}</p> : ''}
        </Modal>
      </div>
    );
  }

  renderFiles(tribeFiles = []) {
    var that = this;
    var nodes = tribeFiles.map(file => {
      return file.isSelected ? (
        <li key={file.id} className={styles.fileSelected} onClick={that.cancelSelectFile.bind(that, file.id)}>
          <div className={styles.file}>
            <Icon type="file-text" />
            <p>{file.file_name}</p>
          </div>
          <div className={styles.selected}>
            <div><span></span></div>
          </div>
        </li>
      ) : (
        <li key={file.id} onClick={that.selecteFile.bind(that, file.id)}>
          <div className={styles.file}>
            <Icon type="file-text" />
            <p>{file.file_name}</p>
          </div>
        </li>
      );
    });

    return (
      <ul>
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

  createTribeFile() {
    console.log('创建群文件');
  }

  downloadTribeFile() {
    console.log('下载群文件');
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
    console.log('删除群文件');
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
    console.log('查看群文件');
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

}

export default GroupPanel;