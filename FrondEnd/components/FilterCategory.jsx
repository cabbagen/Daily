import React, { Component, PropTypes } from 'react';
import styles from './FilterCategory.less';

const PAGE_SIZE = 6;

class FileterCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryItem : this.props.list,
      fullItem : this.props.list
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      categoryItem : nextProps.list,
      fullItem : nextProps.list
    });
  }

  render() {
    var { mainState, mainActions, categoryState, categoryActions } = this.props;
    var content = this.renderContent();

    return (
      <div className={styles.filter_wrap}>
        <div className={styles.filter_header}>
          <input type="text" placeholder="好友筛选" onChange={this.filterList.bind(this)} />
        </div>
        {content}
      </div>
    );
  }

  renderContent() {
    var hasItem = this.state.categoryItem.length > 0 ? true : false;
    var itemNodes = this.renderItem();

    return hasItem ? (
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <ul className={styles.filter_content}>
            {itemNodes}
          </ul>
        </div>
      </div>
    ) : (
      <div className={styles.no_more}>
        <p>~~空空如也~~</p>
      </div>
    );
  }

  renderItem() {
    var nodes = this.state.categoryItem.map((item) => {
      var unreadNode = item.unreadNum ? <span>{item.unreadNum}</span> : '';
      return (
        <li key={item.id} title="双击打开聊天窗口" onDoubleClick={this.openChat.bind(this, item.id)}>
          <div className={`${styles.avator} ${styles.fl}`}>
            <img src={item.avator} />
            {unreadNode}
          </div>
          <div className={`${styles.infos} ${styles.fl}`}>
            <p className={styles.name}>{item.nickname}</p>
            <p className={styles.autograph}>{item.extra}</p>
            <img className={styles.delete} src="/public/images/delete.png" onClick={this.deleteFriend.bind(this, item.id)} />
          </div>
        </li>
      );
    });
    return nodes.length > 0 ? nodes : '';
  }

  filterList(event) {
    var willFindNicName = event.target.value;

    var filterList = this.state.fullItem.filter((frinedItem) => {
      var filterReg = new RegExp(willFindNicName);
      return filterReg.test(frinedItem.nickname);
    });

    this.setState({
      categoryItem : filterList
    });

  }

  openChat(friendId) {
    this.props.openChat(friendId);
  }

  deleteFriend(friendId) {
    this.props.deleteFriend(friendId);
  }
}

// PropTypes checked
FileterCategory.propTypes = {
  list : React.PropTypes.array.isRequired,
  openChat : React.PropTypes.func,
  deleteFriend : React.PropTypes.func
};

export default FileterCategory;
