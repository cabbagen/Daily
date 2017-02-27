<?php
	namespace Home\Controller;
	use Home\Controller;
	Vendor('imSdk.TopSdk');

	class AppController extends InitController {

		private function getImUserInfoFromSession() {

			$userModel = D('user');
			$imTop = $userModel->initIm();
			$uid = session('username');

			$req = new \OpenimUsersGetRequest;
			$req->setUserids($uid);
			$resp = $imTop->execute($req);

			if($resp->userinfos) {
				return $resp->userinfos->userinfos[0];
			} else {
				return false;
			}
		}

		private function getUserInfoFromSession() {
			$userModel = D('user');

			return $userModel->getUserInfo(array(
				'username' => session('username'),
			));
		}

		public function app() {

			$imUserInfos = $this->getImUserInfoFromSession();
			$userInfos = $this->getUserInfoFromSession();

			if(imUserInfos) {
				$userInfo = array(
					'uid' => $imUserInfos->userid,
					'appkey' => C('IM_AppKey'),
					'credential' => $imUserInfos->password,
					'nickName' => $imUserInfos->nick,
					'userId' => $userInfos['id'],
					'avator' => $userInfos['avator'],
				);

				$this->assign('userInfo', json_encode($userInfo));
			}

			$this->display();
		}
	}


?>
