import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
import styles from './Sider.less';

const SubMenu = Menu.SubMenu;

class Sider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: '0',
			openKeys: [],
		};
	}

	render() {
		var { userMenuInfo } = this.props;
		return (
			<div className={styles.sider}>
				<Menu
					mode="inline"
					openKeys={this.state.openKeys}
					selectedKeys={[this.state.current]}
					style={{ width: 240 }}
					onOpenChange={this.onOpenChange.bind(this)}
					onClick={this.handleClick.bind(this)}
				>
				{this.renderSubMenuCategory(userMenuInfo)}
				</Menu>
			</div>
		);

	}

	onOpenChange(openKeys) {
		const state = this.state;
		const latestOpenKey = openKeys.find((key) => !(state.openKeys.indexOf(key) > -1));

		this.setState({ openKeys: [latestOpenKey] });
	}

	handleClick(e) {
		this.setState({ current: e.key });
	}

	renderSubMenuCategory(userResourceInfo) {
		var that = this;
		var subMenuDomArray = [];

		for(var prop in userResourceInfo) {
				subMenuDomArray.push( that[`render${prop}`](userResourceInfo[prop]) );
		}

		return subMenuDomArray;
	}

	renderFolders(foldersInfo) {
		var subMenuKey = 'folders';
		var foldersNodes = foldersInfo.map((folderObject, folderIndex) => {
			return (
				<Menu.Item key={`${subMenuKey}-${folderIndex}`}>
					<Link to={`/web/${folderObject.folder_name}`} onClick={this.folderLinkTo.bind(this, folderObject.id)}>{folderObject.folder_name}</Link>
				</Menu.Item>
			);
		});

		return (
			<SubMenu key={subMenuKey} title={<span><Icon type="folder" /><span>我的文件</span></span>}>
				{foldersNodes}
			</SubMenu>
		);
	}

	folderLinkTo(folderId) {
		console.log(`folders id: ${folderId}`);
	}

	renderCalendars(calendarsInfo) {
		var subMenuKey = 'calendars';
		var calendarsNodes = calendarsInfo.map((calendarObject, calendarIndex) => {
			return (
				<Menu.Item key={`${subMenuKey}-${calendarIndex}`}>
					<Link to={`/web/${calendarObject.calendar_name}`} onClick={this.calendarLinkTo.bind(this, calendarObject.id)}>{calendarObject.calendar_name}</Link>
				</Menu.Item>
			);
		});

		return (
			<SubMenu key={subMenuKey} title={<span><Icon type="calendar" /><span>我的日程</span></span>}>
				{calendarsNodes}
			</SubMenu>
		);
	}

	calendarLinkTo(calendarId) {
		console.log(`calendar id: ${calendarId}`);
	}

	renderCategorys(categorysInfo) {
		var subMenuKey = 'users';
		var usersNodes = categorysInfo.map((categoryObject, categoryIndex) => {
			return (
				<Menu.Item key={`${subMenuKey}-${categoryIndex}`}>
					<Link to={`/web/${categoryObject.category_name}`} onClick={this.categoryLinkTo.bind(this, categoryObject.id)}>{categoryObject.category_name}</Link>
				</Menu.Item>
			);
		});

		return (
			<SubMenu key={subMenuKey} title={<span><Icon type="user" /><span>我的好友</span></span>}>
				{usersNodes}
			</SubMenu>
		);
	}

	categoryLinkTo(categoryId) {
		console.log(`category id: ${categoryId}`);
	}

	renderGroups(groupsInfo) {
		var subMenuKey = 'teams';
		var groupsNodes = groupsInfo.map((groupObject, groupIndex) => {
			return (
				<Menu.Item key={`${subMenuKey}-${groupIndex}`}>
					<Link to={`/web/${groupObject.group_name}`} onClick={this.groupLinkTo.bind(this, groupObject.id)}>{groupObject.group_name}</Link>
				</Menu.Item>
			);
		});

		return (
			<SubMenu key={subMenuKey} title={<span><Icon type="team" /><span>我的小组</span></span>}>
				{groupsNodes}
			</SubMenu>
		);
	}

	groupLinkTo(groupId) {
		console.log(`group id: ${groupId}`);
	}

	renderShares(sharesInfo) {
		var subMenuKey = 'shares';
		var sharesNodes = sharesInfo.map((shareObject, shareIndex) => {
			return (
				<Menu.Item key={`${subMenuKey}-${shareIndex}`}>
					<Link to={`/web/${shareObject.share_name}`} onClick={this.shareLinkTo.bind(this, shareObject.id)}>{shareObject.share_name}</Link>
				</Menu.Item>
			);
		});

		return (
			<SubMenu key={subMenuKey} title={<span><Icon type="share-alt" /><span>我的分享</span></span>}>
				{sharesNodes}
			</SubMenu>
		);
	}

	shareLinkTo(shareId) {
		console.log(`share id: ${shareId}`);
	}


}

export default Sider;