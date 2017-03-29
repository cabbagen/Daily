import React, {Component, PropTypes} from 'react';
import { Icon } from 'antd';
import styles from './MenuOperateModal.less';

class MenuOperateModal extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var { fieldTitleMap } = this.props;
    var that = this;

    var nodeList = Object.keys(fieldTitleMap).map((item, index) => (
      <div key={index}>
        {that.renderMenuCatagory(item, fieldTitleMap[item])}
      </div>
    ));

    return (
      <div className={styles.menu_operate_panel}>
        {nodeList}
      </div>
    );
  }

  renderMenuCatagory(type, title) {
    var { userMenuInfo } = this.props;
    var typeData = userMenuInfo[type];
    var that = this;

    var itemNodes = typeData.map((itemData) => {
      var isShowEdit = that.renderMenuCatagoryItem(type, itemData);
      var keyId = itemData.id || itemData.tribe_id;
      return (
        <li key={keyId}>
          {isShowEdit}
        </li>
      );
    });

    return (
      <div className={styles.menu_category}>
        <h3>{title}</h3>
        <ul>
          <li onClick={this.addItem.bind(this, type)}>
            <div className={styles.menu_category_item}>
              <span>添加</span>
              <i className={styles.menu_category_add}><Icon type="plus" /></i>
            </div>
          </li>
          {itemNodes}
        </ul>
      </div>
    );
  }

  renderMenuCatagoryItem(type, itemData) {
    var showDom = '';
    var keyId = itemData.id || itemData.tribe_id;
    var name = itemData[`${type[0].toLowerCase() + type.slice(1, -1)}_name`] || itemData.name;

    // 初始状态 => itemData.isEditing == undefined
    if(itemData.isEditing) {
      showDom = (
        <input type="text" autoFocus placeholder="输入名称" 
          onBlur={this.confirmModifyFromBlur.bind(this, type, keyId)} 
          onKeyDown={this.confirmModifyFromKeyDown.bind(this, type, keyId)} 
        />
      );
    } else {
      showDom = (
        <div className={styles.menu_category_item} onDoubleClick={this.editItem.bind(this, type, keyId)}>
          <span>{name}</span>
          <i className={styles.menu_category_delete} onClick={this.deleteItem.bind(this, type, keyId)}>
            <Icon type="close" />
          </i>
        </div>
      );
    }

    return showDom;
  }

  confirmModifyFromBlur(type, id, event) {
    this.confirmModify(type, id, event);
  }

  confirmModifyFromKeyDown(type, id, event) {
    if(event.keyCode === 13) {
      this.confirmModify(type, id, event);
    }
  }

  // 修改向后台发送请求
  confirmModify(type, id, event) {
    var { userMenuInfo, mainActions } = this.props;
    var newItemObj = {type, id};

    if(event.target.value === '') {
      event.target.focus();
      return;
    }

    newItemObj[`${type[0].toLowerCase() + type.slice(1, -1)}_name`] = event.target.value;

    mainActions.confirmMenuCategoryModifyItem(newItemObj);

  }

  editItem(type, id) {
    var newState = {};
    var { userMenuInfo, mainActions } = this.props;

    var categoryList = userMenuInfo[type].map(item => {
      if(item.id) {
        if(item.id === id) {
          item[`${type[0].toLowerCase() + type.slice(1, -1)}_name`] = '';
          item.isEditing = true;
        }
      } else {
        if(item.tribe_id === id) {
          item['name'] = '';
          item.isEditing = true;
        }
      }
      return item;
    });

    newState[type] = categoryList;
    mainActions.editMenuCategoryItem(newState);
  }

  // 删除向后台发送数据
  deleteItem(type, id) {
    var { userMenuInfo, mainActions } = this.props;
    var deleteItemObj = {type, id};

    mainActions.deleteMenuCategoryItem(deleteItemObj);
  }

  // 添加向后台发送数据
  addItem(type) {
    var { userMenuInfo, mainActions, userInfo } = this.props;

    var addItemObj = {
      type : type,
      from_user_id : userInfo.userId
    };

    addItemObj[`${type[0].toLowerCase() + type.slice(1, -1)}_name`] = '新建';

    mainActions.addMenuCategoryItem(addItemObj);
  }

}

export default MenuOperateModal;
