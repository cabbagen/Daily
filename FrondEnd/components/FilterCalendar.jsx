import React, { Component, PropTypes } from 'react';
import styles from './FilterCalendar.less';

class FilterCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarItem : this.props.mainState.calendarsCategoryItem,
      fullItem : this.props.mainState.calendarsCategoryItem
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      calendarItem : nextProps.mainState.calendarsCategoryItem,
      fullItem : nextProps.mainState.calendarsCategoryItem
    });
  }

  render() {
    var { mainState, mainActions, calendarState, calendarState } = this.props;
    var content = this.renderContent();

    return (
      <div className={styles.filter_wrap}>
        <div className={styles.filter_header}>
          <input type="text" placeholder="日程筛选" onChange={this.filterList.bind(this)} />
        </div>
        {content}
      </div>
    );
  }

  renderContent() {
    var hasItem = this.state.calendarItem.length > 0 ? true : false;
    var calendarItems = this.renderItem();

    return hasItem ? (
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <ul className={styles.filter_content}>
            {calendarItems}
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
    var that = this;
    var itemNodes = this.state.calendarItem.map((calendarItem) => {
      var calendarContent = calendarItem.isEditing ? (
        <input 
          onKeyDown={that.editKeyDownAffairContent.bind(that, calendarItem.id)}
          onBlur={that.confirmModify.bind(that, calendarItem.id)} 
          type="text" 
          placeholder="请输入任务" 
          defaultValue={calendarItem.affair_content}
        />
      ) : (
        <span 
          className={styles[`color_${calendarItem.affair_type}`]} 
          onDoubleClick={that.editAffairContent.bind(that, calendarItem.id)}
          title={calendarItem.affair_content}
        >
          {calendarItem.affair_content}
        </span>
      );
      return (
        <li key={calendarItem.id}>
          <p className={styles.file_name}>
            {calendarContent}
            <img src="/public/images/delete.png" onClick={this.deleteAffair.bind(this, calendarItem.id)} />
          </p>
          <p>{calendarItem.affair_time}</p>
        </li>
      );
    });

    return itemNodes.length > 0 ? itemNodes : '';
  }

  filterList(event) {
    var willFindCalendarName = event.target.value;

    var filterList = this.state.fullItem.filter((calendarObject, calendarIndex) => {
      var filterReg = new RegExp(willFindCalendarName);
      return filterReg.test(calendarObject.affair_content);
    });

    this.setState({
      calendarItem : filterList
    });

  }

  editKeyDownAffairContent(affairId, event) {
    if(event.keyCode === 13) {
      this.confirmModify(affairId, event);
    }
  }

  confirmModify(affairId, event) {
    var { mainActions, mainState } = this.props;

    if(event.target.value === '') {
      alert('请输入详细内容');
      event.target.focus();
      return;
    }

    mainActions.updateAffair({
      affair_content : event.target.value,
      id : affairId,
      from_calendar_id : mainState.currentCategoryId
    });

  }

  editAffairContent(affairId) {
    var newCalendarItem = this.state.calendarItem.map(item => {
      if(item.id === affairId) {
        item.isEditing = true;
      }
      return item;
    });
    this.setState({
      calendarItem : newCalendarItem
    });
  }

  deleteAffair(affairId) {
    var { mainState, mainActions, calendarActions } = this.props;
    mainActions.deleteAffair(affairId, mainState.currentCategoryId);

    // 删除时拉取一次数据
    calendarActions.requireMonthData(mainState.currentCategoryId);
    calendarActions.requireChartData(mainState.currentCategoryId);
  }

}

export default FilterCalendar;

