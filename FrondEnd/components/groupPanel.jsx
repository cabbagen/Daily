import React, { Component, PropTypes } from 'react';
import { Icon, Button, modal } from 'antd';

import styles from './GroupPanel.less';

class GroupPanel extends Component {

  constructor(props) {
    super(props);
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
      </div>
    );
  }

  inviteTribe() {
    var { mainState } = this.props;
    console.log(mainState.currentCategoryId);
    console.log('邀请入群');
  }

  leaveTribe() {
    var { mainState, groupActions } = this.props;
    var tribeId = mainState.currentCategoryId;
    
    groupActions.leaveTribe(tribeId);
    console.log('退群');
  }

  deleteTribe() {
    console.log('删除群');
  }

  changeTribeFiles() {
    console.log('查看群文件');
  }

}

export default GroupPanel;