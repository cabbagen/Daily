import React, {PropTypes, Component} from 'react';
import { Calendar } from 'antd';
import styles from './calendarPanel.less';

class CalendarPanel extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      
    };
  }

  render() {
    return (
      <div className={styles.calendarPanel}>
        <Calendar dateCellRender={this.dateCellRender.bind(this)} monthCellRender={this.monthCellRender.bind(this)} />
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

  monthCellRender(value) {
    const num = this.getMonthData(value);
    return num ? <div className="notes-months">
      <section>{num}</section>
      <span>Backlog number</span>
    </div> : null;
  }

  getMonthData(value) {
    if(value.month() === 8) {
      return 1394;
    }
  }

}

export default CalendarPanel;


