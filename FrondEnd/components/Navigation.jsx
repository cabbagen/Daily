import React, { PropTypes, Component } from 'react';
import { Modal } from 'antd';

import MsgList from './MsgList';
import MenuOperateModal from './MenuOperateModal.jsx';
import styles from './Navigation.less';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible : false,
      isModalShowErrorMsg : false,
      modalErrorMsg : '',
      isShowUserInfoCenterPanel : false,
      imLinkmanList : [],
      isShowImLinkmanPanel : false,
      imUnReadMsgNumber : 0,
      isCategotyMoaleVisible : false,
    };
  }

  // 绑定事件监听
  componentDidMount() {
    var that = this;
    document.body.addEventListener('click', function() {
      if(that.state.isShowImLinkmanPanel) {
        that.setState({isShowImLinkmanPanel : false});
      }
      if(that.state.isShowUserInfoCenterPanel) {
        that.setState({isShowUserInfoCenterPanel : false});
      }
    }, false);
  }

  render() {
    var { userId, nickName, avator } = this.props.userInfo;
    var that = this;

    var unReadImMsgsNumber = this.getUnReadImMsgsNumber(),
      isShowImLinkmanPanel = this.renderImLinkmanPanel(),
      isShowUserInfoCenterPanel = this.renderUserInfoCenterPanel(),
      isModalShowErrorMsg = this.renderModelShowErrorMsg(),
      triangleStyle = this.getTriangleStyle();

    var menuOperateModalProps = Object.assign({}, that.props, {
      fieldTitleMap : {
        Folders : '我的文件',
        Calendars : '我的日程',
        Categorys : '我的好友',
        Groups : '我的小组'
      }
    });

    return (
      <header className={styles.top_navigation}>
        <div className={styles.logo}>
          <img src="/public/images/logo.png" />
        </div>
        <div className={styles.top_list}>
          <ul>
            <li className={styles.add}>
              <div onClick={this.showCategoryModal.bind(this)}>
                <img src="/public/images/add.png" />
              </div>
            </li>
            <li className={styles.invite}>
              <div onClick={this.sendInvitationEmail.bind(this)}>
                <img src="/public/images/visit.png" />
              </div>
            </li>
            <li className={styles.msg}>
              <div onClick={this.showImLinkmanPanel.bind(this)}>
                <img src="/public/images/msg.png" />
              </div>
              {unReadImMsgsNumber}
              {isShowImLinkmanPanel}
            </li>
            <li className={styles.user_info} onClick={this.showUserInfoCenterPanel.bind(this)}>
              <img src={avator} />
              <span>{nickName}</span>
              <i className={triangleStyle}></i>
              {isShowUserInfoCenterPanel}
            </li>
          </ul>
        </div>
        <Modal 
          title="发出你的邀请函" 
          visible={this.state.isModalVisible}  
          onOk={this.handleOk.bind(this)} 
          onCancel={this.handleCancel.bind(this)} 
          maskClosable={false}>
            <input className={styles.target_email} type="email" ref="targetEmail" name="email" placeholder="请输入你的邮箱地址" />
            {isModalShowErrorMsg}
        </Modal>

        <Modal
          title="选项编辑"
          visible={this.state.isCategotyMoaleVisible}
          onOk={this.handleCategoryModalOk.bind(this)}
          onCancel={this.handleCategoryModalCancel.bind(this)}
          maskClosable={false}>
          <MenuOperateModal {...menuOperateModalProps} />
        </Modal>

      </header>
    );
  }

  getUnReadImMsgsNumber() {
    return this.state.imUnReadMsgNumber > 0 ? (
      <span className={styles.msg_all_number}>{this.state.imUnReadMsgNumber}</span>
    ) : '';
  }

  renderImLinkmanPanel() {
    return this.state.isShowImLinkmanPanel ? (
      <MsgList msgList={this.state.imLinkmanList} /> 
    ) : '';
  }

  renderUserInfoCenterPanel() {
    var { userId } = this.props.userInfo;
    return this.state.isShowUserInfoCenterPanel ? (
      <ol onClick={(e) => {e.stopPropagation()}}>
        <li><a href={`/Home/UserInfo/${userId}.html`}>个人中心</a></li>
        <li><a href="/Home/Login/loginAccount.html">登出</a></li>
      </ol>
    ) : '';
  }

  renderModelShowErrorMsg() {
    return this.state.isModalShowErrorMsg ? (
      <p className={styles.email_error}><small>{this.state.modalErrorMsg}</small></p>
    ) : '';
  }

  getTriangleStyle() {
    return this.state.isShowUserInfoCenterPanel ? styles.triangle_hover : '';
  }

  showCategoryModal() {
    this.setState({isCategotyMoaleVisible : true});
  }

  sendInvitationEmail() {
    this.setState({isModalVisible : true});
  }

  showUserInfoCenterPanel() {
    this.setState({isShowUserInfoCenterPanel : true});
  }

  showImLinkmanPanel() {
    this.setState({isShowImLinkmanPanel : true});
  }

  handleOk() {
    var isInputEmailValid = this.checkEmail(),
      inputEmail = this.refs.targetEmail.value,
      that = this;

    if(isInputEmailValid) {
      this.setState({isModalVisible : false}, function() {
        that.props.mainActions.sendEmailInvitation(inputEmail);
      }, false);
    }
  }

  checkEmail() {
    var emailReg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/,
      inputEmail = this.refs.targetEmail.value;

    if(inputEmail.length == 0) {
      this.setState({
        modalErrorMsg : '邮箱地址不能为空！',
        isModalShowErrorMsg : true
      });

      return false;
    }

    if(!emailReg.test(inputEmail)) {
      this.setState({
        isModalShowErrorMsg : true,
        modalErrorMsg : '请输入合法的邮箱地址哦！'
      });

      return false;
    }

    return true;
  }

  handleCancel() {
    this.setState({isModalVisible : false});
  }

  handleCategoryModalOk() {
    this.setState({isCategotyMoaleVisible : false});
  }

  handleCategoryModalCancel() {
    this.setState({isCategotyMoaleVisible : false});
  }

}


export default Navigation;
