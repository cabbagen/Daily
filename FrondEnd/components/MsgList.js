import React, { Component, PropTypes } from 'react';
import styles from './MsgList.less';

class MsgList extends Component {
    constructor(prop) {
      super(prop);
    }

    renderItem() {
        var { msgList } = this.props,
            msgItems = [];

        if(msgList.length > 0) {
            msgItems = msgList.map((msgItem, index) => {
                <li key={index}>
                    <div className={styles.msgListAvator}>
                        <img src={msgItem.avator} />
                        <span className={styles.msgNumber}>{msgItem.msgNumber}</span>
                    </div>
                    <div className={styles.msgListContent}>
                        <p className={styles.msgListNick}>
                            <span>{msgItem.nick}</span>
                            <i>{msgItem.time}</i>
                        </p>
                        <p className={styles.msgListLastInfo}>{msgItem.lastMsg}</p>
                    </div>
                </li>
            });
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

    render() {
        var msgItems = this.renderItem();

        return (
            <ol className={styles.msgList}>
                {msgItems}
            </ol>
        );
    }
}

MsgList.propTypes = {
    msgList : PropTypes.array.isRequired
}

export default MsgList;
