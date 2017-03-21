import React, {PropTypes, Component} from 'react';
import { Calendar, Button, Icon, Modal, Radio } from 'antd';
import styles from './CalendarPanel.less';

const RadioGroup = Radio.Group;

class CalendarPanel extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      isShowCreateModal : false,
      createModalEventType : 1,
      isShowAppraiseModal : false,
      isShowCurrentDayModal : false
    };
  }

  // 拉取本月数据
  componentWillMount() {
    var { calendarActions } = this.props;
    calendarActions.requireMonthData();
  }

  render() {
    var that = this;
    var { calendarState, mainState } = this.props;

    return (
      <div className={styles.calendar_panel}>
        <div className={styles.calendar_panel_header}>
          <Button onClick={that.showCreateModal.bind(that)} title="新建日程任务">新建</Button>
          <Button onClick={that.showAppraiseModal.bind(that)} title="评价日程任务">评价</Button>
          <Button title="返回日历">日历</Button>
          <Icon title="查看完成图表" type="pie-chart" />
        </div>
        <div className={styles.calendar_panel_content}>
          <Calendar 
            fullscreen={false}
            dateCellRender={that.dateCellRender.bind(that)} 
            onPanelChange={this.panelChange.bind(this)}
            onSelect={this.selectDate.bind(this)}
          />
        </div>
        <Modal title="新建日程任务" 
          visible={this.state.isShowCreateModal} 
          onOk={this.createAffairModalOk.bind(this)}
          onCancel={this.createAffairModalCancel.bind(this)}
        >
          <input ref="createAffairContent" className={styles.create_affair_modal_input} placeholder="请输入日程任务" />
          <RadioGroup onChange={this.changeCreateModalEventType.bind(this)} value={this.state.createModalEventType}>
            <Radio value={1}><span className={styles.event_type_1}>重要且紧急的事</span></Radio>
            <Radio value={2}><span className={styles.event_type_2}>重要不紧急的事</span></Radio>
            <Radio value={3}><span className={styles.event_type_3}>不重要紧急的事</span></Radio>
            <Radio value={4}><span className={styles.event_type_4}>不重要不紧急事</span></Radio>
          </RadioGroup>
        </Modal>
        <Modal title="评价日程任务"
          visible={this.state.isShowAppraiseModal}
          onOk={this.appraiseAffairModalOk.bind(this)}
          onCancel={this.appraiseAffairModalCancel.bind(this)}
        >
          <ul className={styles.appraise_affair_list}>
            {
              mainState.calendarsCategoryItem.map(affairItem => {
                var button = affairItem.is_complete == 1 ? (
                  <button type="button" onClick={this.completeAffair.bind(this, affairItem.id)}>未完成</button>
                ) : (
                  <button type="button" onClick={this.cancelCompleteAffair.bind(this, affairItem.id)} className={styles.isComplete}>已完成</button>
                );

                return (
                  <li key={affairItem.id}>
                    <p>
                      <span className={styles[`event_type_${affairItem.affair_type}`]}>{affairItem.affair_content}</span>
                      {button}
                    </p>
                    <p>{affairItem.affair_time}</p>
                  </li>
                );
              })
            }
          </ul>
        </Modal>
        <Modal title="当日日程任务"
          visible={this.state.isShowCurrentDayModal}
          onOk={this.currentDayAffairModalOk.bind(this)}
          onCancel={this.currentDayAffairModalCancel.bind(this)}
        >
          <ul className={styles.appraise_affair_list}>
            {
              calendarState.currentAffairList.map(affairItem => {
                var button = affairItem.is_complete == 1 ? (
                  <button type="button">未完成</button>
                ) : (
                  <button type="button" className={styles.isComplete}>已完成</button>
                );

                return (
                  <li key={affairItem.id}>
                    <p>
                      <span className={styles[`event_type_${affairItem.affair_type}`]}>{affairItem.affair_content}</span>
                      {button}
                    </p>
                    <p>{affairItem.affair_time}</p>
                  </li>
                );
              })
            }
          </ul>
        </Modal>
      </div>
    );
  }

  showCreateModal() {
    var { mainState } = this.props;
    if(mainState.currentCategoryId === '') {
      alert('请先选择日程一级菜单，再创建日程任务');
      return;
    }
    this.setState({
      isShowCreateModal : true
    });
  }

  showAppraiseModal() {
    var { mainState } = this.props;
    if(mainState.currentCategoryId === '') {
      alert('请先选择日程一级菜单，再评价日程任务');
      return;
    }
    this.setState({
      isShowAppraiseModal : true
    });
  }

  dateCellRender(value) {
    var listData = this.getListData(value);

    return listData.length > 0 ? (
      <div className={styles.circle}></div>
    ) : '';

  }

  getListData(value) {
    var { calendarState } = this.props;

    if(calendarState.monthAffair && typeof calendarState.monthAffair[value.date()] !== 'undefined') {
      return calendarState.monthAffair[value.date()];
    } else {
      return [];
    }
  }

  panelChange(moment) {
    var { calendarActions } = this.props;
    calendarActions.requireMonthData(moment._d.getTime());
  }

  selectDate(moment) {
    var isMonth = $('span.ant-radio-button-checked').next('span').text() === '月' ? true : false;
    var { calendarActions } = this.props;

    if(isMonth) {
      this.setState({
        isShowCurrentDayModal : true
      }, function() {
        calendarActions.requireDayData(moment._d.getTime());
      });
    }
  } 

  createAffairModalOk() {
    var affairContent = this.refs.createAffairContent.value;
    var affairType = this.state.createModalEventType;
    var { mainActions, mainState } = this.props;

    if(affairContent.length === 0) {
      alert('请写入具体的日程任务');
      return;
    }

    if(mainState.currentCategoryId === '') {
      alert('请先选择日程一级菜单，再创建日程任务');
      return;
    }

    this.setState({isShowCreateModal : false}, function() {
      mainActions.addAffair({
        affair_content : affairContent,
        affair_type : affairType,
        from_calendar_id : mainState.currentCategoryId
      });
    });
  }

  createAffairModalCancel() {
    this.setState({
      isShowCreateModal : false
    });
  }

  changeCreateModalEventType(event) {
    this.setState({
      createModalEventType : event.target.value
    });
  }
  
  appraiseAffairModalOk() {
    this.setState({
      isShowAppraiseModal : false
    });
  }

  appraiseAffairModalCancel() {
    this.setState({
      isShowAppraiseModal : false
    });
  }

  completeAffair(affairId) {
    var { mainActions, mainState } = this.props;
    mainActions.completeAffair(affairId, mainState.currentCategoryId);
  }

  cancelCompleteAffair(affairId) {
    var { mainActions, mainState } = this.props;
    mainActions.cancelCompleteAffair(affairId, mainState.currentCategoryId);
  }

  currentDayAffairModalOk() {
    this.setState({
      isShowCurrentDayModal : false
    });
  }

  currentDayAffairModalCancel() {
    this.setState({
      isShowCurrentDayModal : false
    });
  }


}

export default CalendarPanel;


