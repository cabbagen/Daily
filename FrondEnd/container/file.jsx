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
		var { fileState, mainState, fileActions } = this.props;

		var filterFilesProps = {
			foldersCategoryItem : mainState.foldersCategoryItem
		};

		return (
			<div className={styles.file_content}>
				<FilterFiles {...filterFilesProps} />
				{/*<FileOperatePanel />*/}
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
		fileActions : bindActionCreators(actions.fileActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(File);