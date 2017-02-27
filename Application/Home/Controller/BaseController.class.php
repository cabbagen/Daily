<?php
	namespace Home\Controller;
	use Think\Controller;

	class BaseController extends Controller {

		/**
		 * 检验用户是否登录
		 * @formData  user_id  =>   user.id
		 * @return boolean 如果用户登录， 则返回 `true`, 反之返回 `false`;
		 */
		private function isLogin() {
			$user_id = session('user_id');
			return $user_id ? true : false;
		}

		/**
		 * 如果用户未登录，则调用此方法重定向至登录页面
		 * @return [type] [description]
		 */
		protected function toLogin() {
			$isLogin = $this->isLogin();
			if($isLogin) {
				$this->redirect('/Home/Login/login');
			}
		}

		/**
		 * 空方法，用于控制器 空操作处理
		 * @return [type] [description]
		 */
		protected function _empty() {
			echo 'empty';
		}

		/**
		 * 调试时使用，进行跨域处理
		 * @return [type] [description]
		 */
		public function allowCrossOrigin() {
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Methods:POST, GET');
		}

		

	}


?>
