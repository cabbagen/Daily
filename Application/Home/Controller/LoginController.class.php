<?php 
	namespace Home\Controller;
	use Home\Controller;

	class LoginController extends BaseController {

		private $hasLoginError = false;

		private $registSuccessResponse = array(
			'status' => 300,
			'data' => array('redirectUrl' => '/Home/app/app.html'),
		);

		private $registErrorResponse = array(
			'status' => 500,
			'msg' => '该用户名称已存在，请换个吧！',
		);

		private $avatorUploadConfig = array(
			'maxSize' => 3145728,
			'exts' => array('jpg', 'gif', 'png', 'jpeg'),
			'rootPath' => './Public/files/',
			'savePath' => './avators/',
		);

		private $avatorUrl = '/public/files/avator/default.png';

		private function addWebsiteSession($username, $userId) {
			session('username', $username);
			session('userId', $userId);
		}

		public function loginAccount() {
			$this->assign('hasError', $this->hasLoginError);
			$this->display();
		}

		public function registAccount() {
			$this->display();
		}

		public function forgetPassword() {
			$this->display();
		}

		public function understandMore() {
			$this->display();
		}

		public function handleLogin() {
			$userModel = D('Users');
			$result = $userModel->checkUser( I('post.username'), I('post.password') );

			if($result) {
				$this->addWebsiteSession($result['username'], $result['id']);
				$this->hasLoginError = false;
		
				$this->redirect('/Home/App/app');
			} else {
				$this->hasLoginError = true;
				$this->redirect('Login/loginAccount');
			}
		}

		public function handleRegist() {
			$userModel = D('Users');
			$userInfos = array_merge(I('post.', null), array(
				'avator' => $this->avatorUrl,
				'password' => md5( I('post.password', null) ),
			));

			$result = $userModel->createUser($userInfos);

			if($result) {
				$this->addWebsiteSession($result['username'], $result['id']);
				$this->ajaxReturn($this->registSuccessResponse);
			} else {
				$this->ajaxReturn($this->registErrorResponse);
			}

		}

		public function uploadAvator() {
			$avatorUpload = new \Think\Upload($this->avatorUploadConfig);
			$info = $avatorUpload->uploadOne($_FILES['avatorImg']);

			if(!$info) {
				$this->ajaxReturn(array(
					'status' => 500,
					'data' => $avatorUpload->getError(),
				));
			} else {
				$this->avatorUrl = '/public/files' . substr($info['savepath'].$info['savename'], 1);

				$this->ajaxReturn(array(
					'status' => 200,
					'data' => $this->avatorUrl,
				));
			}
		}

	}
?>

