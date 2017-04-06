import React, { PropTypes, Component } from 'react';
import { Icon, Button, Modal } from 'antd';
var path = require('path');

import styles from './FileOperatePanel.less';

var editor = null;

class FileOperatePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileId : this.props.currentFileObject && this.props.currentFileObject.id || '',
      shareModalvisible : false,
      modalErrorMsg : '',
    }
  }

  componentDidMount() {
    editor = new Simditor({textarea : $('#editor')});
  }

  componentWillReceiveProps(nextProps) {
    var isChangeFile = (nextProps.currentFileObject && nextProps.currentFileObject.id !== this.state.fileId) ?
      true : false;
    var isCreateFile = nextProps.resetEditState;
    var that = this;

    if(isChangeFile || isCreateFile) {
      this.setState({fileId : nextProps.currentFileObject && nextProps.currentFileObject.id || ''}, function() {
        editor.setValue(nextProps.currentFileContent);
        that.refs.file_name.value = nextProps.currentFileObject && nextProps.currentFileObject.file_name || '';
        if(isCreateFile) {
          nextProps.cancelResetEditState();
        }
      });
    }
  }

  render() {
    var that = this;
    
    return (
      <div className={styles.file_panel}>
        <div className={styles.file_operate}>
          <input ref="file_name" type="text" className={styles.file_caption} placeholder="请输入文件内容" />
          <div>
            <Button onClick={that.handleSave.bind(that)}>保存</Button>
            <Icon title="文件上传" type="upload" onClick={that.showUpload.bind(that)} />
            <input ref="uploadFile" type="file" name="file" style={{display : 'none'}} onChange={that.upload.bind(that)} />
            <Icon title="文件下载" type="download" onClick={that.download.bind(this)} />
            <Icon title="文件分享" type="share-alt" onClick={that.share.bind(that)} />
          </div>
        </div>
        <div className={styles.file_editor_wrap}>
          <textarea id="editor" placeholder="从这里开始写文件" autoFocus></textarea>
        </div>
        <Modal title="分享文件" onOk={this.handleModalOk.bind(this)} onCancel={this.handleModalCancel.bind(this)} visible={this.state.shareModalvisible}>
          <p>请输入对方的 Email </p>
          <input className={styles.shareInput} type="email" name="email" ref="email" />
          {this.state.modalErrorMsg.length > 0 ? <p className={styles.error}>{this.state.modalErrorMsg}</p> : ''}
        </Modal>
      </div>
    );

  }

  handleSave() { 
    if(this.props.currentFileObject) {
      this.updateFile();
    } else {
      this.createFile();
    }
  }

  updateFile() {
    var that = this;
    this.props.updateEditFile(that.refs.file_name.value, editor.getValue());
  }

  createFile() {
    var that = this;
    this.props.createEditFile(that.refs.file_name.value, editor.getValue());
  }

  showUpload() {
    this.refs.uploadFile.click();
  }

  upload(event) {
    this.props.uploadFile(event.target);
  }

  download() {
    if( !this.isSelectFile() ) {
      alert('请先选择文件');
      return;
    }

    this.props.downloadFile();
  }

  share() {
    if( !this.isSelectFile() ) {
      alert('请先选择文件');
      return;
    }
    this.setState({shareModalvisible : true});
  }

  isSelectFile() {
    return this.props.currentFileObject ? true : false;
  }

  handleModalCancel() {
    this.setState({shareModalvisible:false});
  }

  handleModalOk() {
    var isPassEmail = this.checkEmail();
    if(isPassEmail) {
      var email = this.refs.email.value;
      var fileId = this.props.currentFileObject.id;
      this.setState({shareModalvisible : false}, function() {
        this.props.shareFile(fileId, email);
      });  
    }
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

FileOperatePanel.PropTypes = {
  currentFileObject : PropTypes.object.isRequired,
  currentFileContent : PropTypes.string.isRequired,
  resetEditState : PropTypes.string,
  cancelResetEditState : PropTypes.func,
  updateEditFile : PropTypes.func,
  createEditFile : PropTypes.func,
  uploadFile : PropTypes.func,
  downloadFile : PropTypes.func,
  shareFile : PropTypes.func
};


export default FileOperatePanel;