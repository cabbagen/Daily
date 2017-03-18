import React, { PropTypes, Component } from 'react';
import { Icon, Button } from 'antd';

import styles from './FileOperatePanel.less';

// 文本编辑器
var editor = null;

class FileOperatePanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing : true
		};
	}

	// 首次渲染 编辑器
	componentDidMount() {
		editor = new Simditor({textarea : $('#editor')});
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.fileState.currentFileObject) {
			this.setState({isEditing : false, fileName : nextProps.fileState.currentFileName});
		} else {
			this.setState({isEditing : true, fileName : nextProps.fileState.currentFileName});
			if(this.refs.file_name) {
				this.refs.file_name.value = '';
			}
		}
	}

	componentDidUpdate() {
		var hasTextEditor = $('#editor').length > 0 ? true : false; 
		if(hasTextEditor) {
			editor = new Simditor({textarea : $('#editor')});
		}
	}

	render() {
		
		var {currentFileObject, currentFileContent} = this.props.fileState;
		var that = this;

		var panelHeader = currentFileObject ? this.renderHeaderForExistFile(currentFileObject) : this.renderHeaderForNoExistFile();
		var panelContent = currentFileObject ? this.renderContentForExistFile(currentFileContent) : this.renderContentForNoExistFile();

		return (
			<div className={styles.file_panel}>
				{panelHeader}
				{panelContent}
			</div>
		);
	}

	renderHeaderForExistFile(currentFileObject) {

		var that = this;

		return this.state.isEditing ? (
			<div className={styles.file_operate}>
				<input
					ref="file_name"
					type="text"
					className={styles.file_caption}
					placeholder="请输入文件名称"
					defaultValue={currentFileObject.file_name}
				/>
				<div>
					<Button onClick={that.changeSaveStateAndUpdate.bind(that)}>保存</Button>
					<Icon type="upload" />
					<Icon type="download" />
					<Icon type="share-alt" />
				</div>
			</div>
		) : (
			<div className={styles.file_operate}>
				<h2>{currentFileObject.file_name}</h2>
				<div>
					<Button onClick={that.changeEditState.bind(that)}>编辑</Button>
					<Icon type="upload" />
					<Icon type="download" />
					<Icon type="share-alt" />				
				</div>
			</div>
		);
	}

	renderHeaderForNoExistFile() {
		var that = this;

		return (
			<div className={styles.file_operate}>
				<input 
					ref="file_name" 
					type="text" 
					className={styles.file_caption} 
					placeholder="请输入文件名称" 
				/>
				<div>
					<Button onClick={that.changeSaveStateAndCreate.bind(that)}>保存</Button>
					<Icon type="upload" />
					<Icon type="download" />
					<Icon type="share-alt" />
				</div>
			</div>
		);
	}

	changeEditState() {
		this.setState({isEditing : true});
	}

	changeSaveStateAndUpdate() {
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

	changeSaveStateAndCreate() {
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

	renderContentForExistFile(currentFileContent) {

		if(editor) {
			editor.destroy();
			editor = null;
		}

		return this.state.isEditing ? (
			<div className={styles.file_editor_wrap}>
				<textarea id="editor" placeholder="从这里开始写文件" autoFocus defaultValue={currentFileContent}></textarea>
			</div>
		) : (
			<div className={styles.file_editor_wrap} dangerouslySetInnerHTML={{__html : currentFileContent}}></div>
		);
	}

	renderContentForNoExistFile() {
		return (
			<div className={styles.file_editor_wrap}>
				<textarea id="editor" placeholder="从这里开始写文件" autoFocus></textarea>
			</div>
		);
	}


}

export default FileOperatePanel;