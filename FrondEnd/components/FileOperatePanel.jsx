import React, { PropTypes, Component } from 'react';
import { Icon, Button } from 'antd';
import styles from './FileOperatePanel.less';

class FileOperatePanel extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {
		var editor = new Simditor({
			textarea: $('#editor')
		});
	}

	render() {
		var fileOperateHeader = this.renderFileOperateHeader();
		var fileContent = this.renderFileContent();

		return (
			<div className={styles.file_panel}>
				{fileOperateHeader}
				{fileContent}
			</div>
		);
	}

	renderFileOperateHeader() {
		return (
			<div className={styles.file_operate}>
				<input type="text" className={styles.file_caption} placeholder="请输入文件名称" />
				<div>
					<Button>保存</Button>
					<Icon type="upload" />
					<Icon type="download" />
					<Icon type="share-alt" />
				</div>
			</div>
		);
	}

	renderFileContent() {
		return (
			<div className={styles.file_editor_wrap}>
				<textarea id="editor" placeholder="Balabala" autoFocus></textarea>
			</div>
		);
	}
}

export default FileOperatePanel;