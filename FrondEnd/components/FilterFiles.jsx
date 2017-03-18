import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './FilterFiles.less';

class FilterFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	fileItem : this.props.mainState.foldersCategoryItem,
    	fullFileItem : this.props.mainState.foldersCategoryItem
    };
  }

  componentWillReceiveProps(nextProps) {
  	this.setState({
  		fileItem : nextProps.mainState.foldersCategoryItem,
    	fullFileItem : nextProps.mainState.foldersCategoryItem
  	});
  }

  render() {
    var fileContent = this.renderFileContent();
    return (
      <div className={styles.filter_warp}>
        <div className={styles.filter_header}>
        	<span onClick={this.createFile.bind(this)} className={styles.add_file} title="新建文件"></span>
          <input type="" placeholder="文档筛选" onChange={this.filterList.bind(this)} />
        </div>
        {fileContent}
      </div>
    );
  }

  renderFileContent() {
    var fileList = this.renderItem();
    var hasFile = fileList.length > 0 ? true : false;

    return hasFile ? (
      <ul className={styles.filter_content}>
        {fileList}
      </ul>
    ) : (
      <div className={styles.no_more}>
        <p>~~空空如也~~</p>
      </div>
    );
  }

  renderItem() {
    var that = this;
    var fileNodeList = this.state.fileItem.map((fileObject, fileIndex) => (
      <li key={fileObject.id} onClick={that.requireFile.bind(that, fileObject.file_path, fileObject.id)}>
        <p className={styles.file_name}>
          <span>{fileObject.file_name}</span>
          <img src="/public/images/delete.png" onClick={that.deleteFile.bind(that, fileObject.id)} />
        </p>
        <p>{fileObject.create_time}</p>
      </li>
    ));

    return fileNodeList.length === 0 ? '' : fileNodeList;

  }

  createFile() {
    var { fileActions } = this.props;
    fileActions.resetState();
  }

  requireFile(filePath, fileId) {
    var { fileActions } = this.props;
    fileActions.requireFileContent(filePath, fileId);
  }

  filterList(event) {
    var willFindFileName = event.target.value;

    var filterList = this.state.fullFileItem.filter((fileObject, fileIndex) => {
    var filterReg = new RegExp(willFindFileName);
      return filterReg.test(fileObject.file_name);
    });

    this.setState({
      fileItem : filterList
    });

  }

  deleteFile(fileId, event) {
    event.stopPropagation();
    var { mainActions, mainState, fileActions } = this.props;

    mainActions.deleteFile(fileId, mainState.currentCategoryId);
    fileActions.resetState();
  }
}

export default FilterFiles;