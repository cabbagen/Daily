import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from 'antd';
import actions from '../actions';

import FilterFiles from '../components/FilterFiles.jsx';
import FileOperatePanel from '../components/FileOperatePanel.jsx';
import styles from '../container/file.less';


class File extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps) {
    var { fileActions, fileState } = nextProps;
    var isShowNotification = fileState.notifications.length > 0 ? true : false;

    if(isShowNotification) {
      this.showNotification(fileState.notifications);
    }
  }

  showNotification(description) {
    var { fileActions } = this.props;
    notification.open({
      message: '系统通知',
      description: description
    });

    fileActions.removeNotification();
  }

  render() {
    var {fileState, mainState, fileActions, mainActions} = this.props;
    
    return (
      <div className={styles.file_content}>
        <FilterFiles {...this.props} />
        <FileOperatePanel {...this.props} />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    fileState : state.file,
    mainState : state.main
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fileActions : bindActionCreators(actions.fileActions, dispatch),
    mainActions : bindActionCreators(actions.mainActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(File);