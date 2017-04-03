<?php 
  namespace Home\Controller;
	use Home\Controller;

  class GroupController extends BaseController {

    // 退出群
    public function leaveTribe() {
      $tribeId = I('tribeId', null);
      $isAdmin = D('Groups')->checkTribeAdmin($tribeId);

      if($isAdmin) {
        $this->ajaxReturn(array('status' => 205, 'msg' => '您是群主，不能退出该群!'));
      } else {
        $leaveTribeResult = D('Groups')->leaveTribe($tribeId);
        $groupList = D('Groups')->getUserMenuCatetoryInfosFromModel('Group', $tribeId);

        if($leaveTribeResult && $groupList) {
          $this->ajaxReturn(array('status' => 200,'groupList' => $groupList));
        } else {
          $this->ajaxReturnError();
        }
      }
    }

    // 邀请加群
    public function inviteJoinTribe() {
      $userInfo = D('Users')->getUserInfo(array('email' => I('email', null)));

      if($userInfo) {
        $addResult = $this->addMsgNotification(array(
          'to_user_id' => $userInfo['id'],
          'from_user_id' => $this->getUserIdFromSession(),
          'type' => 'addTribe',
          'im_tribe_id' => I('imTribeId', null),
        ));

        if($addResult) {
          $this->ajaxReturn(array('status' => 200, 'msg' => '请求已发出'));
        } else {
          $this->ajaxReturnError();
        }

      } else {
        $this->ajaxReturn(array('status' => 204, 'msg' => 'email有误，请稍后重试'));
      }
    }

    // 同意加群
    public function argressJoinTribe() {
      $joinResult = D('Groups')->joinTribe(I('tribeId', null));
      $addMsgResult = $this->addMsgNotification(array(
        'type' => 'agress',
        'from_user_id' => $this->getUserIdFromSession(),
        'to_user_id' => I('friendId', null)
      ));
      if($joinResult && $addMsgResult) {
        $this->ajaxReturn(array('status' => 200, 'msg' => '加入成功，请刷新查看！'));
      } else {
        $this->ajaxReturnError();
      }
    }

    // 拒绝加群  
    public function rejectJoinTribe() {
      // 方法留空
      // 这里在 拒绝加好友处处理
    }

    // 群组踢人
    public function expelTribeMember() {
      $userInfo = D('Users')->getUserInfo(array('id' => I('userId', null)));
      $isAdmin = D('Groups')->checkTribeAdmin(I('tribeId', null));

      if($isAdmin) {
        $expelResult = D('Groups')->expelTribe(I('tribeId', null), $userInfo['username']);
        $memberList = D('Groups')->getCategoryItemFromModel('Groups', I('tribeId', null));

        if($expelResult && $memberList) {
          $this->ajaxReturn(array('status' => 200, 'memberList' => $memberList));
        } else {
          $this->ajaxReturnError();
        }
      } else {
        $this->ajaxReturn(array('status' => 204, 'msg' => '您不是管理员不能踢人!'));
      }
    }


    // 解散群
    public function dismissTribe() {
      $tribeId = I('tribeId', null);
      $isAdmin = D('Groups')->checkTribeAdmin($tribeId);

      if($isAdmin) {
        $dismissTribeResult = D('Groups')->deleteItemFromModel( array('id' => $tribeId) );
        $groupList = D('Groups')->getUserMenuCatetoryInfosFromModel('Group', $tribeId);

        if($dismissTribeResult && $groupList) {
          $this->ajaxReturn(array('status' => 200, 'groupList' => $groupList));
        } else {
          $this->ajaxReturnError();
        }
      } else {
        $this->ajaxReturn(array('status' => 205, 'msg' => '您不是群主，不能解散该群'));
      }
    }

    // 获取群文件
    public function getTribeFiles() {
      $tribeId = I('tribeId', null);
      $tribeFiles = D('Tribefiles')->getTribeFiles($tribeId);

      if(is_array($tribeFiles)) {
        $this->ajaxReturn(array('status' => 200, 'data' => $tribeFiles));
      } else {
        $this->ajaxReturnError();
      }

    }

    // 获取群组管理员信息
    public function getTirbeAdminInfo() {
      $tribeId = I('tribeId', null);
      $adminInfo = D('Groups')->getTribeAdminInfo($tribeId);

      if($adminInfo) {
        $this->ajaxReturn(array('status' => 200, 'data' => $adminInfo));
      } else {
        $this->ajaxReturnError();
      }
    }
    
    // 批量下载文件
    public function downloadTribeFiles() {
      $tribeFileId = I('fileIds', null);

      $zipName = './Public/zip/temp.zip';
      $zip = new \ZipArchive;
      $zip->open($zipName, \ZipArchive::CREATE);
      $zip->addEmptyDir('files');  // 增加空目录

      foreach($tribeFileId as $key => $value) {
        $fileInfo = D('Files')->getFile($value);
        $fileContent = file_get_contents($fileInfo['file_path']);
        if($fileContent) {
          $zip->addFromString('files/' . md5($fileInfo['file_name']) . '.md', $fileContent);
        }
      }
      $zip->close();

      $file = fopen($zipName, 'r');

      header('Content-type: application/octet-stream');   
      header('Accept-Range: bytes');
      header('Accept-Length: ' . filesize($file));
      header('Content-Disposition: attachment; filename=files.zip');

      $buffer = 1024;
      while(!feof($file)) {
        $file_data = fread($file, $buffer);
        echo $file_data;
      }

      fclose($file);
      unlink($zipName);
     

    }

    // 批量群组删除文件
    public function deleteTribeFiles() {
      $tribeFileIds = I('tribeFileIds', null);
      $tribeId = I('tribeId', null);
      $result = array();

      foreach($tribeFileIds as $key => $value) {
        array_push($result, D('Tribefiles')->deleteTribeFile($value));
      }

      $tribeFiles = D('Tribefiles')->getTribeFiles($tribeId);
      if(in_array(0, $result)) {
        $this->ajaxReturnError();
      }

      if(is_array($tribeFiles)) {
        $this->ajaxReturn(array('status' => 200, 'tribeFiles' => $tribeFiles));
      } else {
        $this->ajaxReturnError();
      }
    }

  }

?>