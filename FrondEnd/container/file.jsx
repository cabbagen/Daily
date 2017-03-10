import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import styles from '../container/file.less';


class File extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<p>hello</p>
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		fileState : state.file
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fileActions : bindActionCreators(actions.fileActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(File);