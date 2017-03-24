import React, { Component, PropTypes } from 'react';
import { Button, Pagination } from 'antd';

import styles from './CategoryPanel.less'

const PAGE_SIZE = 6;

class CategoryPanel extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var { categoryState } = this.props;
		var userList = this.renderUserList();
		var myPagination = categoryState.currentUserList && categoryState.currentUserList.length > PAGE_SIZE ? (
			<div className={styles.pagination}>
				<Pagination 
					defaultCurrent={1} 
					total={categoryState.searchTotalPage} 
					pageSize={PAGE_SIZE} 
					onChange={this.changePage.bind(this)} 
				/>
			</div>
		) : '';

		return (
			<div className={styles.category_panel}>
				<div className={styles.category_panel_header}>
					<input type="text" ref="search" placeholder="输入用户名查找好友" />
					<Button onClick={this.searchUser.bind(this)}>查找</Button>
				</div>
				{userList}
				{myPagination}
			</div>
		);
	}

	renderUserList() {
		var { categoryState } = this.props;
		var hasNodes = categoryState.currentUserList && categoryState.currentUserList.length > 0 ? true : false;

		if(hasNodes) {
			var userNodes = categoryState.currentUserList.map((item) => {
				var button = item.is_added === '0' ? (
					<button className={styles.not_added} type="button">添加好友</button>
				) : (
					<button className={styles.added} type="button">已添加</button>
				); 

				return (
					<li key={item.id}>
						<div className={`${styles.avator} ${styles.fl}`}>
							<img src={item.avator} />
						</div>
						<div className={styles.infos}>
							<p className={styles.nickname}>{item.username}</p>
							<p className={styles.autograph}>{item.extra}</p>
							{button}
						</div>
					</li>
				);
			});
		}

		return hasNodes ? (
			<ul className={styles.category_panel_content}>
				{userNodes}
			</ul>
		) : '';
	}

	changePage(currentPage, pageSize) {
		console.log(currentPage);
		console.log(pageSize);
	}

	searchUser() {
		var keyWord = this.refs.search.value;
		var { categoryActions } = this.props;

		categoryActions.requireUserForAddFriendList({
			currentPage : 1,
			pageSize : PAGE_SIZE,
			keyWord : keyWord
		});
	}
}

export default CategoryPanel; 