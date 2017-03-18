import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import FilterFiles from '../components/FilterFiles.jsx';
import FileOperatePanel from '../components/FileOperatePanel.jsx';
import MenuOperateModal from '../components/MenuOperateModal.jsx';
import styles from '../container/file.less';


class File extends Component {
	constructor(props) {
		super(props);
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