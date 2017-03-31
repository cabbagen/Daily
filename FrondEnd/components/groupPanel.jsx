import React, { Component, PropTypes } from 'react';
import { Icon, Button, Modal } from 'antd';

import styles from './GroupPanel.less';

class GroupPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible : false,
      modalErrorMsg : ''
    }
  }

  render() {
    var that = this;

    return (
      <div className={styles.group_panel}>
        <div className={styles.group_panel_header}>
          <p className={styles.chargeman}>组长: 小小夏同学</p>
          <p className={styles.panel_operate}>
            <Icon type="file-add" />
            <Icon type="download" />
            <Icon type="delete" />
            <Button onClick={that.inviteTribe.bind(that)}>邀请</Button>
            <Button onClick={that.leaveTribe.bind(that)}>退群</Button>
            <Button onClick={that.deleteTribe.bind(that)}>解散群</Button>
            <Button onClick={that.changeTribeFiles.bind(that)}>群文件</Button>
          </p>
        </div>
        <div className={styles.group_panel_content}>
          
        </div>
        <Modal title="邀请入群" 
          visible={this.state.visible} 
          onOk={this.inviteAddTribeModalOk.bind(this)} 
          onCancel={this.inviteAddTribeModalCancel.bind(this)}>
            <p>请输入对方的 Email</p>
            <input className={styles.email} type="email" required="required" ref="email" />
            {this.state.modalErrorMsg.length > 0 ? <p className={styles.error}>{this.state.modalErrorMsg}</p> : ''}
        </Modal>
      </div>
    );
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