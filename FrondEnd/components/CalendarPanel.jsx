import React, {PropTypes, Component} from 'react';
import { Calendar, Button, Icon, Modal } from 'antd';
import styles from './CalendarPanel.less';

class CalendarPanel extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      
    };
  }

  render() {
    var that = this;

    return (
      <div className={styles.calendar_panel}>
        <div className={styles.calendar_panel_header}>
          <Button title="新建日程任务">新建</Button>
          <Button title="查看历史任务">历史</Button>
          <Button title="评价日程任务">评价</Button>
          <Icon title="查看完成图表" type="pie-chart" />
        </div>
        <div className={styles.calendar_panel_content}>
          <Calendar dateCellRender={that.dateCellRender.bind(that)} />
        </div>
      </div>
    );
  }

  dateCellRender(value) {
    var listData = this.getListData(value);
    return (
      <ul className="events">
        {
          listData.map(item => (
            <li key={item.content}>
              <span className={styles[`event-${item.type}`]}>*</span>
              {item.content}
            </li>
          ))
        }
      </ul>
    );
  }

  getListData(value) {
    var listData = [];
    switch(value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'normal', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'normal', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'normal', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData;
  }

}

export default CalendarPanel;


