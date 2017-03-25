import React, { Component, PropTypes } from 'react';
import styles from './FilterCategory.less';

const PAGE_SIZE = 6;

class FileterCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryItem : this.props.mainState.categorysCategoryItem,
			fullItem : this.props.mainState.categorysCategoryItem
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			categoryItem : nextProps.mainState.categorysCategoryItem,
			fullItem : nextProps.mainState.categorysCategoryItem
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
			<ul className={styles.filter_content}>
				{itemNodes}
			</ul>
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
				<li key={item.friend_id} title="双击打开聊天窗口" onDoubleClick={this.openChat.bind(this)}>
					<div className={`${styles.avator} ${styles.fl}`}>
	    			<img src="/public/images/avator_1.png" />
	    			{unreadNode}
	    		</div>
	    		<div className={`${styles.infos} ${styles.fl}`}>
	    			<p className={styles.name}>{item.nickname}</p>
	    			<p className={styles.autograph}>{item.extra}</p>
	    			<img className={styles.delete} src="/public/images/delete.png" onClick={this.deleteFriend.bind(this, item.friend_id)} />
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

  openChat() {
  	console.log('打开聊天窗口');
  	window.open('/Home/App/chat', 'chatWindow', 'toolbar=no, status=no, scrollbars=0,resizable=0,menubar＝0,location=0,width=700,height=500');
  }

  deleteFriend(friendId) {
  	var { mainActions, mainState, categoryActions } = this.props;

  	// 删除好友操作之后，拉取好友列表
  	mainActions.deleteFriend({
  		friend_id : friendId, 
  		from_category_id : mainState.currentCategoryId,
  		currentPage : 1,
  		pageSize : PAGE_SIZE
  	});
  }
}

export default FileterCategory;
