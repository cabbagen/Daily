<?php
	namespace Home\Controller;
	use Think\Controller;
	// Vendor('msgNotification.notification#class');

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

		// ==================== email 模块相关 ============================
		



		// ==================== 消息通知长轮询部分 =========================

		public function listenMsgLongNotification() {
			$msg = $this->getOneMsgNotification();
			if($msg) {
				$this->ajaxReturn(array(
					'status' => 200,
					'data' => json_encode($msg),
				));
			} else {
				$this->ajaxReturn(array(
					'status' => 205,
					'msg' => '当前没有消息',
					'toUserId' => $this->getUserIdFromSession(),
				));
			}
		}
		
		public function addMsgNotification($messageArray) {
			return D('Message')->addMessage($messageArray);
		}

		public function getOneMsgNotification() {
			$userId = $this->getUserIdFromSession();
			$msg = D('Message')->getMessage($userId);

			if($msg) {
				D('Message')->deleteMessage((int)$msg['to_user_id']);
				return $msg;
			} else {
				return false;
			}
		}
		

	}


?>
