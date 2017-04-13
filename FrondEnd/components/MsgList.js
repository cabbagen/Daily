import React, { Component, PropTypes } from 'react';
import styles from './MsgList.less';

class MsgList extends Component {
  constructor(prop) {
    super(prop);
  }

  render() {
    var msgItems = this.renderItem();

    return (
      <ol className={styles.msgList}>
        {msgItems}
      </ol>
    );
  }

  renderItem() {
    var { msgList } = this.props,
      msgItems = [];
    if(msgList.length > 0) {
      msgItems = msgList.map((msgItem, index) => (
        <li key={index} onClick={this.openChat.bind(this, msgItem.contact)}>
          <div className={styles.msgListAvator}>
            <img src={msgItem.avator || 'https://img.alicdn.com/tps/TB1mIGOLVXXXXa6XpXXXXXXXXXX-100-100.png'} />
            <span className={styles.msgNumber}>{msgItem.msgCount}</span>
          </div>
          <div className={styles.msgListContent}>
            <p className={styles.msgListNick}>
              <span>{msgItem.nickname || msgItem.tribeName}</span>
              <i>{this.formDate(msgItem.timestamp)}</i>
            </p>
            <p className={styles.msgListLastInfo}>您当前有未读消息</p>
          </div>
        </li>
      ));
    } else {
      msgItems.push(
        <li key="0">
          <div className={styles.msgListAvator}>
            <img src="http://localhost:8088/avator.png" />
          </div>
          <div className={styles.msgListContent}>
            <p className={styles.msgListNick}>
              <span>系统提示</span>
              <i>2017-01-23</i>
            </p>
            <p className={styles.msgListLastInfo}>当前没有新消息</p>
          </div>
        </li>
      );
    }

    return msgItems;
  }

  formDate(timestamp) {
    var date = new Date(timestamp*1000);
    var year = date.getFullYear(),
      month = date.getMonth() < 0 ? '0' + date.getMonth() : date.getMonth(),
      day = date.getDate() < 0 ? '0' + date.getDate() : date.getDate();

    return year + '-' + month + '-' + day;
  }
  
  openChat(contact) {
    this.props.openChat(contact);
  }
}

MsgList.propTypes = {
    msgList : PropTypes.array.isRequired,
    openChat : PropTypes.func.isRequired
}

export default MsgList;
