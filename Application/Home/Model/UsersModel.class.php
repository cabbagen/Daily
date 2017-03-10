<?php
	namespace Home\Model;
	use Home\Model;
	Vendor('imSdk.TopSdk');

	class UsersModel extends BaseModel {
		
		public function checkUser($username, $password) {
			$userModel = M('users');
			$condition = array(
				'username' => $username,
				'password' => $password,
			);

			$result = $userModel->where($condition)->find();

			return $result;
		}

		public function createUser($userInfos) {
			$userModel = M('users');
			$result = $userModel->create($userInfos)->add();

			if($result) {
				$userInfos = array(
					'userid' => md5($userInfos['username']),
					'password' => substr($userInfos['password'], 0, 10),
					'nick' => $userInfos['nick'],
				);
				return $imResult = $this->imAddUser($userInfos);

			} else {
				return false;
			}
		}

		public function imAddUser($userinfoArray) {
			$imTop = $this->initIm();
			$imReq = new \OpenimUsersAddRequest;
			$userInfos = new Userinfos;

			$userInfos->userid = $userinfoArray['userid'];
			$userInfos->password = $userinfoArray['password'];
			$userInfos->nick = $userinfoArray['nick'];

			$imReq->setUserinfos(json_encode($userInfos));
			$imResp = $imTop->execute($imReq);

			return !!$imResp->uid_succ;

		}

		public function initIm() {
			$imTop = new \TopClient;
			$imTop->appkey = C('IM_AppKey');
			$imTop->secretKey = C('IM_AppSecret');
			$imTop->format = 'json';

			return $imTop;
		}

		public function getUserInfo($queryArray) {
			$userModel = M('users');

			return $userModel->where($queryArray)->find();
		}

	}

?>