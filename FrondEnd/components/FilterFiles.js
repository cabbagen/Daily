import React, { PropTypes, Component } from 'react';
import { Link } from 'dva/router';
import styles from './FilterFiles.less';

class FilterFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileItem : [
        {fileName : "我的文档一"},
        {fileName : "我的文档二"},
        {fileName : "我的文档三"}
      ],
      fullFileItem : [
        {fileName : "我的文档一"},
        {fileName : "我的文档二"},
        {fileName : "我的文档三"}
      ]
    };
  }

  render() {
    var fileContent = this.renderFileContent();
    return (
      <div className={styles.filterWarp}>
        <div className={styles.filterHeader}>
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
      <ul className={styles.filterContent}>
        {fileList}
      </ul>
    ) : (
      <div className={styles.noMore}>
        <p>~~空空如也~~</p>
      </div>
    );
  }

  renderItem() {
    var fileNodeList = this.state.fileItem.map((fileObject, fileIndex) => (
      <li key={fileIndex}>
        <p className={styles.fileName}>
          <span>{fileObject.fileName}</span>
          <img src="http://localhost:8088/delete.png" onClick={this.deleteFile.bind(this, fileIndex)} />
        </p>
        <p className={styles.fileTime}>2017-02-23 3:23:23</p>
      </li>
    ));

    return fileNodeList.length === 0 ? '' : fileNodeList;

  }

  filterList(event) {
    var willFindFileName = event.target.value;

    var filterList = this.state.fullFileItem.filter((fileObject, fileIndex) => {
    var filterReg = new RegExp(willFindFileName);
      return filterReg.test(fileObject.fileName);
    });

    this.setState({
      fileItem : filterList
    });

  }

  deleteFile(fileId, event) {
    event.stopPropagation();
    this.props.deleteFile(fileId)
  }
}

export default FilterFiles;