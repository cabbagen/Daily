import React, { Component, PropTypes } from 'react';
import { Modal, Icon } from 'antd';

import styles from './MsgServer.less';

class MsgServer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible : false,
      inviteList : this.props.inviteList
    };
  }

  componentWillMount() {
    if(this.props.inviteInfo) {
      this.setState({
        visible : true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.inviteInfo) {
      this.setState({
        visible : true,
        inviteList : nextProps.inviteList
      });
    }
  }

  render() {
    var type = this.props.inviteInfo.type;
    var that = this;
    var infoNode = type === 'addFriend' ? this.renderFriendModal() : this.renderTribeModal();

    var infofriendGroupList = type === 'addFriend' ? (
      <div>
        <ul className={styles.list}>
          {
            this.state.inviteList.map(item => {
              var style = item.isSelected ? styles.selected : '';
              return (
                <li key={item.id} ref={`list-${item.id}`} onClick={that.selected.bind(that, item.id)} className={style}>
                  <span>{item.category_name}</span>
                </li>
              );
            })
          }
        </ul>
        <div className={styles.create} onClick={that.createCategory.bind(that)}>
          <a>新建</a>
          <Icon type="plus" />
        </div>
      </div>
      
    ) : '';

    return (
      <div>
        <Modal title="邀请通知" 
          visible={this.state.visible} 
          onOk={this.inviteModalOk.bind(this, type)} 
          onCancel={this.inviteModalCancel.bind(this, type)}>
            {infoNode}
            {infofriendGroupList}
        </Modal>
      </div>
    );
  }

  renderFriendModal() {
    var { inviteInfo } = this.props;
    return (
      <div className={styles.inviteInfo}>
        <img className={styles.avator} src={inviteInfo.avator} />
        <p className={styles.confirmMsg}>{inviteInfo.nickname}</p>
        <p className={styles.confirmMsg}>请求添加您为好友</p>
      </div>
    );
  }

  renderTribeModal() {
    var { inviteInfo } = this.props;
    return (
      <div className={styles.inviteInfo}>
        <img className={styles.avator} src="" />
        <p className={styles.confirmMsg}>{inviteInfo.group_name}</p>
        <p className={styles.confirmMsg}>邀请您加入群</p>
      </div>
    );
  }

  inviteModalOk(type) {
    var params = null;
    var selectCategoryId = '';

    if(type === 'addFriend') {
      var selectCategory = this.state.inviteList.find(item => item.isSelected);
      if(!selectCategory) {
        alert('请先选择分组');
        return;
      } else {
        selectCategoryId = selectCategory['id'];
      }
      params = {
        friendId : this.props.inviteInfo.id,
        friendFromCategoryId : this.props.inviteInfo.from_category_id,
        fromCategoryId : selectCategoryId
      };
    } else {
      params = {
        friendId : this.props.inviteInfo.from_user_id,
        tribeId : this.props.inviteInfo.im_tribe_id
      };
    }
    this.setState({visible : false}, function() {
      this.props.inviteModalOk(type, params);
    });
  }

  inviteModalCancel(type) {
    var toUserId = type === 'addFriend' ? this.props.inviteInfo.id : this.props.inviteInfo.from_user_id;
    
    this.setState({visible : false}, function() {
      this.props.inviteModalCancel(type, toUserId);
    });
  }

  selected(id) {
    var newList = this.state.inviteList.map(item => {
      if(item.id === id) {
        item['isSelected'] = true;
      } else {
        delete item['isSelected'];
      }
      return item;
    });

    this.setState({inviteList : newList});
  }

  createCategory() {
    this.props.createCategory();
  }

}

MsgServer.PropTypes = {
  inviteModalOk : PropTypes.func.isRequired,
  inviteModalCancel : PropTypes.func.isRequired,
  inviteInfo : PropTypes.object.isRequired,
  inviteList : PropTypes.array,
  createCategory : PropTypes.func
};


export default MsgServer;
