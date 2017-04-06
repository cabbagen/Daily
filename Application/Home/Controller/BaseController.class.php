<?php
  namespace Home\Controller;
  use Think\Controller;

  class BaseController extends Controller {

    private function isLogin() {
      $user_id = session('user_id');
      return $user_id ? true : false;
    }

    protected function toLogin() {
      $isLogin = $this->isLogin();
      if($isLogin) {
        $this->redirect('/Home/Login/login');
      }
    }

    protected function _empty() {
      echo 'empty';
    }

    // 通用 ajax 错误返回处理
    public function ajaxReturnError($msg = "系统繁忙，请稍后重试") {
      $this->ajaxReturn(array(
        'status' => 500,
        'msg' => $msg
      ));
    }

    public function getUserIdFromSession() {
      return session('userId');
    }


    // ==================== 消息通知监听 =========================
    public function listenMsgLongNotification() {
      $msg = $this->getOneMsgNotification();
      if($msg) {
        if($msg['type'] == 'addFriend' || $msg['type'] == 'addTribe') {
          $this->ajaxReturn(array('status' => 200, 'data' => $msg));
        } else if($msg['type'] == 'reject') {
          $this->ajaxReturn(array('status' => 204, 'msg' => '对方拒绝了你的请求'));
        } else if($msg['type'] == 'agress') {
          $this->ajaxReturn(array('status' => 203, 'msg' => '对方已经同意你的请求，请刷新查看！'));
        } else if($msg['type'] == 'shareFile') {
          $this->ajaxReturn(array('status' => 203, 'msg' => '有人给你分享了文件，请注意查看！'));
        }
      } else {
        $this->ajaxReturn(array('status' => 205, 'msg' => '当前没有消息'));
      }
    }
    
    public function addMsgNotification($messageArray) {
      return D('Message')->addMessage($messageArray);
    }

    public function getOneMsgNotification() {
      $userId = $this->getUserIdFromSession();
      $msg = D('Message')->getMessage($userId);

      if($msg) {
        D('Message')->deleteMessage((int)$msg[0]['msgid']);
        return $msg[0];
      } else {
        return false;
      }
    }
    

  }


?>
