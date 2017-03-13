<?php
	namespace Home\Controller;
	use Home\Controller;

	class EmailController extends ImController {

		private $inviteTitle = "来自sessino('username')的邀请函";

		private $inviteContent = '<p>您的好友邀请您加入我们的平台，点击下面的链接立即加入!</p><p><a href="http://www.baidu.com">http://www.baidu.com</a></p>';

		private $findPasswordTitle = "找回密码通知";

		private $findPasswordContent = "<p>您的密码已成功找回，请不要泄露给其他人！</p><p>新的密码为：</p>";

		private function createRandomPassword() {
			
		}

		public function sendEmailToInviter() {
			$this->allowCrossOrigin();

			$isSendSuccess = sendEmail(I('post.email', null), $this->inviteTitle, $this->inviteContent);

			if($isSendSuccess) {
				$this->ajaxReturn(array(
					'status' => 200
				));
			} else {
				$this->ajaxReturnError();
			}
		}

		public function findPasswordFromEmail() {
			$this->allowCrossOrigin();
			$newPassword = $this->createRandomPassword();

			if($newPassword) {
				
			} else {
				
			}

		}
	}

?>