// 动画单页面，不涉及相关 state 与 reducer

import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import styles from './InitLoading.less';

class InitLoading extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps) {
    var { mainState } = nextProps;
    if(!mainState.isLoading) {
      window.location.hash = '#web';
    }
  }

  render() {
    return (
      <div className={styles.spinner}>
        <div className={styles.cube1}></div>
        <div className={styles.cube2}></div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    mainState : state.main
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mainActions : bindActionCreators(actions.mainActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InitLoading);