<?php
	namespace Home\Controller;
	use Home\Controller;
  Vendor('markdown.markdown#class');
  Vendor('php-markdown-lib.Michelf.Markdown#inc');
  Vendor('Markdownify-master.src.index');

	class FilesController extends BaseController {
		
    // 请求文件内容
    public function requireFileContent() {
      $fileContent = \Michelf\Markdown::defaultTransform( file_get_contents(I('filePath', null)) );
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

      if($result && is_array($fileList)) {
        $this->ajaxReturn(array('status' => 200, 'fileList' => $fileList));
      } else {
        $this->ajaxReturnError();
      }
    }
    
    // 保存文件, 便于 上传和下载 md 文件，这里进行 存储转化
    public function saveFile() {
      $converter = new \Markdownify\Converter;
      $fileContent = $converter->parseString( htmlspecialchars_decode(I('fileContent', null)) );

      $fileResult = file_put_contents(I('file_path', null), $fileContent);
      $fileModelResult = D('Files')->updateFile(array(
        'file_name' => I('file_name', null),
        'id' => I('id', null),
      ));
      $fileList = D('Folders')->getCategoryItemFromModel('Folders', I('from_folder_id', null));

      if($fileResult && is_array($fileList)) {
        $this->ajaxReturn(array('status' => 200, 'fileList' => $fileList));
      } else {
        $this->ajaxReturnError();
      }
    }

    // 新建文件接口
    public function createFile() {
      $converter = new \Markdownify\Converter;
      $fileContent = $converter->parseString( htmlspecialchars_decode(I('fileContent', null)) );

      $fileName = './Public/files/uploadFiles/' . time() . '.md';

      $fileResult = file_put_contents($fileName, $fileContent);
      $fileModelResult = D('Files')->saveFile(array(
        'file_name' => I('file_name', null),
        'file_path' => $fileName,
        'from_folder_id' => I('from_folder_id', null)
      ));
      $fileList = D('Folders')->getCategoryItemFromModel('Folders', I('from_folder_id', null));

      if($fileResult && $fileModelResult && is_array($fileList)) {
        $this->ajaxReturn(array('status' => 200, 'fileList' => $fileList));
      } else {
        $this->ajaxReturnError();
      }

    }

    // 下载处理
    public function downloadFile() {
      $filePath = I('file_path', null);
      $downName = I('file_name', null) . '.md';

      if( file_exists($filePath) ) {
        $fp = fopen($filePath, "r");
        $fileSize = filesize($filePath);

        header('Content-type: application/octet-stream');
        header('Accept-Range: bytes');
        header('Accept-Length: ' . $fileSize);
        header('Content-Disposition: attachment; filename=' . $downName);

        echo fread($fp, $fileSize);
        fclose($fp);
      } else {
        die('下载失败，请稍后重试！');
      }
    }

    // 上传文件
    public function uploadFile() {
      $fileName = './Public/files/uploadFiles/' . time() . '.md';

      if($_FILES['file']['error'] > 0) {
        $this->ajaxReturnError();
      } else {
        $fileResult = move_uploaded_file($_FILES['file']['tmp_name'], $fileName);
        $modelResult = D('Files')->saveFile(array(
          'file_name' => '上传文件',
          'file_path' => $fileName,
          'from_folder_id' => I('from_folder_id', null)
        ));

        if($fileResult && $modelResult) {
          $this->ajaxReturn(array('status' => 200, successMsg => '上传成功'));
        } else {
          $this->ajaxReturnError();
        }
      }
    }

    // 分享文件
    public function shareFile() {
      $userId = $this->getUserIdFromSession();
      $toUserId = D('Users')->getUserInfo(array('email' => I('email', null)))['id'];

      $getShareFileResult = D('Shares')->getShareFile(array(
        'share_file_id' => I('fileId', null),
        'from_user_id' => $userId,
        'to_user_id' => $toUserId,
      ));

      if($getShareFileResult) {
        $this->ajaxReturn(array('status' => 200, 'msg' => '你已经分享过了'));
      } else {
        $msgResult = D('Message')->addMessage(array(
          'type' => 'shareFile',
          'from_user_id' => $userId,
          'to_user_id' => $toUserId,
        ));

        $shareResult = D('Shares')->addShareFile(array(
          'share_file_id' => I('fileId', null),
          'from_user_id' => $userId,
          'to_user_id' => $toUserId,
        ));

        if($msgResult && $shareResult) {
          $this->ajaxReturn(array('status' => 200, 'msg' => '已分享成功!'));
        } else {
          $this->ajaxReturnError();
        }
      }
      
    }

    

	}

?>