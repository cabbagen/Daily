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

		private $msgLongNotificationPool = array();

		public function listenMsgLongNotification() {
			session_write_close();
			header("Content-Type: text/event-stream\n\n");
			header('Cache: no-cache');
			$counter = rand(1, 10);

			while(1) {
				echo "event: ping \n";
				$curDate = date();
				echo 'data: {"time": "' . $curDate . '"}';
				echo "\n\n";

				$counter--;
				if(!$counter) {
					echo 'data: This is a message at time ' . $curDate . "\n\n";
					$counter = rand(1, 10);
				}
				ob_end_flush();
				flush();
				sleep(1);
			}
		}
		
		public function addMsgNotification() {
			D('Message')->addMessage(array(
				'type' => 'addFriend',
				'to_user_id' => 2,
				'from_user_id' => 1
			));
			$this->ajaxReturnError();
		}
		

	}


?>
