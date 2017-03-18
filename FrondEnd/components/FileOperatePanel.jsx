import React, { PropTypes, Component } from 'react';
import { Icon, Button } from 'antd';

import styles from './FileOperatePanel.less';

var editor = null;

class FileOperatePanel extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		editor = new Simditor({textarea : $('#editor')});
	}

	componentWillUpdate(nextProps, nextState) {
		editor.setValue(nextProps.fileState.currentFileContent);
		if(nextProps.fileState.currentFileObject) {
			this.refs.file_name.value = nextProps.fileState.currentFileObject.file_name;
		} else {
			this.refs.file_name.value = '';
		}
	}

	render() {
		var that = this;
		
		return (
			<div className={styles.file_panel}>
				<div className={styles.file_operate}>
					<input ref="file_name" type="text" className={styles.file_caption} placeholder="请输入文件内容" />
					<div>
						<Button onClick={that.handleSave.bind(that)}>保存</Button>
						<Icon type="upload" onClick={that.upload.bind(that)} />
						<Icon type="download" onClick={that.download.bind(this)} />
						<Icon type="share-alt" onClick={that.share.bind(that)} />
					</div>
				</div>
				<div className={styles.file_editor_wrap}>
					<textarea id="editor" placeholder="从这里开始写文件" autoFocus></textarea>
				</div>
			</div>
		);

	}

	handleSave() {
		var { fileState } = this.props;

		if(fileState.currentFileObject) {
			this.updateFile();
		} else {
			this.createFile();
		}
	}

	updateFile() {
		var { fileState, mainActions, mainState, fileActions } = this.props;
		var that = this;

		var params = Object.assign({}, fileState.currentFileObject, {
			fileContent : editor.getValue(),
			file_name : that.refs.file_name.value
		});

		if(params.file_name.length === 0) {
			alert('请输入文件名称再保存');
			return;
		}

		mainActions.updateFile(params);
		fileActions.requireFileContent(fileState.currentFileObject.file_path, fileState.currentFileObject.id);
	}

	createFile() {
		var { mainState, mainActions, fileActions } = this.props;
		var that = this;
		
		var params = {
			fileContent : editor.getValue(),
			file_name : that.refs.file_name.value,
			from_folder_id : mainState.currentCategoryId
		};

		if(params.file_name.length === 0) {
			alert('请输入文件名称再保存');
			return;
		}

		mainActions.createFile(params);
		fileActions.resetState();
	}

	upload() {
		console.log('文件上传');
	}

	download() {
		if( !this.isSelectFile() ) {
			alert('请先选择文件');
			return;
		}
		
		console.log('这里是文件下载');
	}

	share() {
		if( !this.isSelectFile() ) {
			alert('请先选择文件');
			return;
		}
		console.log('文件分享');
	}

	isSelectFile() {
		return this.props.fileState.currentFileObject ? true : false;
	}

}

export default FileOperatePanel;