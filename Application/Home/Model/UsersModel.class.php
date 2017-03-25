<?php
	namespace Home\Model;
	use Home\Model;
	Vendor('imSdk.TopSdk');

	class UsersModel extends BaseModel {
		
		public function checkUser($username, $password) {
			return $this->where(array(
				'username' => $username,
				'password' => md5($password),
			))->find();
		}

		public function createUser($userInfos) {
			$result = $this->data($userInfos)->add();
			if($result) {
				$userInfos = array(
					'userid' => md5($userInfos['username']),
					'password' => substr($userInfos['password'], 0, 10),
					'nick' => $userInfos['nickname'],
				);
				return $imResult = $this->imAddUser($userInfos);
			} else {
				return false;
			}
		}

		public function imAddUser($userinfoArray) {
			$imTop = $this->initIm();
			$imReq = new \OpenimUsersAddRequest;
			$userInfos = new \Userinfos;

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
			return $this->where($queryArray)->find();
		}

		// 好友部分相关
		public function getTotalUserCount($keyWord) {
			$userId = $this->getUserId();
			// 如果有 关键词 则进行模糊查询
			if( strlen($keyWord) != 0 ) {
				return $this->where("username like '%$keyWord%'")->count();
			} else {
				return $this->count() - 1;
			}
		}

		// 好友部分相关
		public function getUsersForPagination($currentPage, $pageSize, $keyWord) {
			$userId = $this->getUserId();
			// 如果有 关键词 则进行模糊查询
			if( strlen($keyWord) != 0 ) {
				$sql = "select id, username, avator, extra, nickname from think_users " . 
					"where id != $userId and username like '%$keyWord%' limit $currentPage, $pageSize";
			} else {
				$sql = "select id, username, avator, extra, nickname from think_users " . 
					"where id != $userId limit $currentPage, $pageSize";
			}

			return $this->query($sql);

		}



	}

?>
