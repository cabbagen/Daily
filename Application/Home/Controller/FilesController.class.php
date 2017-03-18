<?php
	namespace Home\Controller;
	use Home\Controller;
  Vendor('markdown.markdown#class');

	class FilesController extends EmailController {
		
    // 请求文件内容
    public function requireFileContent() {
      $fileContent = htmlspecialchars_decode( file_get_contents(I('filePath', null)) );
      $fileResult = D('Files')->getFile(I('fileId', null));
      if($fileContent && $fileResult) {
        $this->ajaxReturn(array(
          'status' => 200, 
          'data' => array('fileObject' => $fileResult, 'fileContent' => $fileContent),
        ));
      } else {
        $this->ajaxReturnError();
      }
    }


    // 删除文件
    public function deleteFile() {
      $result = D('Files')->deleteFile(I('fileId', null));
      $fileList = D('Files')->getCategoryItemFromModel('Folders', I('from_folder_id', null));

      if($result && $fileList) {
        $this->ajaxReturn(array('status' => 200, 'fileList' => $fileList));
      } else {
        $this->ajaxReturnError();
      }
    }
    
    // 保存文件
    public function saveFile() {
      $fileContent = I('fileContent', null);
      $fileResult = file_put_contents(I('file_path', null), $fileContent);
      $fileModelResult = D('Files')->updateFile(array(
        'file_name' => I('file_name', null),
        'id' => I('id', null),
      ));
      $fileList = D('Folders')->getCategoryItemFromModel('Folders', I('from_folder_id', null));

      if($fileResult && $fileList) {
        $this->ajaxReturn(array('status' => 200, 'fileList' => $fileList));
      } else {
        $this->ajaxReturnError();
      }
    }

    // 新建文件接口
    public function createFile() {
      $fileContent = I('fileContent', null);
      $fileName = './Public/files/uploadFiles/' . time() . 'txt';

      $fileResult = file_put_contents($fileName, $fileContent);
      $fileModelResult = D('Files')->saveFile(array(
        'file_name' => I('file_name', null),
        'file_path' => $fileName,
        'from_folder_id' => I('from_folder_id', null)
      ));
      $fileList = D('Folders')->getCategoryItemFromModel('Folders', I('from_folder_id', null));

      if($fileResult && $fileModelResult && $fileList) {
        $this->ajaxReturn(array('status' => 200, 'fileList' => $fileList));
      } else {
        $this->ajaxReturnError();
      }

    }

    // markdown 测试
    public function markdown() {
      $markdown = new \Markdown();
      $htmlFile = file_get_contents('./Public/files/uploadFiles/1489713670.txt');
      // echo $htmlFile;

      $md = $markdown->parseHtml( htmlspecialchars_decode($htmlFile) );
      file_put_contents('./Public/files/uploadFiles/md.md', $md);
      echo $md;

      // echo $htmlFile;
      // var_dump($markdown);
      
    }

    public function demo() {
      echo 'helo';
    }

    // public function downloadFile() {
    //   $fileInfo = I('')
    // }

    

	}

?>