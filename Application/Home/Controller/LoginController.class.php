<?php 
	namespace Home\Controller;
	use Think\Controller;

	class LoginController extends Controller {

		private function logining() {

		}

		private function checkUser() {

		}

		private function reRedirect() {

		}


		public function login() {
			$this->display();
		}

		public function signIn() {
			$this->display();
		}

		public function _empty() {
			echo 'empty';
		}

		public function handleLogin() {
			$isPassCheck = $this->checkUser();
			
			if( $isPassCheck ) {
				$this->logining();
				$this->reRedirect();
			} else {
				$this->redirect('Home/Login/login');
			}
		}

		public function handleSignIn() {

		}

		

	}


?>