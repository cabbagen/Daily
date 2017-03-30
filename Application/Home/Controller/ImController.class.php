<?php
	namespace Home\Controller;
	use Home\Controller;
	Vendor('imSdk.TopSdk');

	class ImController extends BaseController {
		public function initIm() {
			$imTop = new \TopClient;
			$imTop->appkey = C('IM_AppKey');
			$imTop->secretKey = C('IM_AppSecret');
			$imTop->format = 'json';

			return $imTop;
		}

		public function imAddUser() {
			$imTop = $this->initIm();
			$imReq = new \OpenimUsersAddRequest;
			$userInfos = new \Userinfos;

			$userinfoArray = array(
				'userid' => 'shiqi11',
				'password' => '123456',
				'nick' => '十七'
			);

			$userInfos->userid = $userinfoArray['userid'];
			$userInfos->password = $userinfoArray['password'];
			$userInfos->nick = $userinfoArray['nick'];

			$imReq->setUserinfos(json_encode($userInfos));
			$imResp = $imTop->execute($imReq);

			var_dump( !!$imResp->uid_succ );
			// var_dump($imResp);

		}


		public function queryUserFromIm() {
			$imTop = $this->initIm();
			$req = new \OpenimUsersGetRequest;
			$req->setUserids("4e70ffa82fbe886e3c4ac00ac374c29b");
			$resq = $imTop->execute($req);

			var_dump($resq->userinfos);
		}
		
		// 创建群
		public function createImGroup() {
			$imTop = $this->initIm();
			$req = new \OpenimTribeCreateRequest();
			$user = new \OpenImUser;
			$user->uid = md5("test_1");
			$user->taobao_account = "false";
			$user->app_key = C("IM_AppKey");
			$req->setUser(json_encode($user));
			$req->setTribeName("tribenamedemp");
			$req->setNotice("tribenamedemp");
			$req->setTribeType("0");
			$members->uid = md5("test_1");
			$members->taobao_account = "false";
			$members->app_key = C("IM_AppKey");

			$req->setMembers(json_encode($members));
			$resp = $imTop->execute($req);

			var_dump($resp);

		}

		// 获取群成员
		public function getTribeMembers() {
			$imTop = $this->initIm();
			$req = new \OpenimTribeGetmembersRequest;
			$user = new \OpenImUser;
			$user->uid = md5("test_2");
			$user->taobao_account = "false";
			$user->app_key = C("IM_AppKey");

			$req->setUser(json_encode($user));
			$req->setTribeId("117146911");
			$resp = $imTop->execute($req);

			var_dump($resp->tribe_user_list);
		}

		// 获取用户群列表
		public function getUserTribeList() {
			$imTop = $this->initIm();
			$req = new \OpenimTribeGetalltribesRequest;
			$user = new \OpenImUser;
			$user->uid = md5("test_1");
			$user->taobao_account = "false";
			$user->app_key = C("IM_AppKey");
			$req->setUser(json_encode($user));
			$req->setTribeTypes("0");
			$resp = $imTop->execute($req);

			var_dump($resp->tribe_info_list);
		}

		// 解散群
		public function deleteTribe() {
			$imTop = $this->initIm();
			$req = new \OpenimTribeDismissRequest;
			$user = new \OpenImUser;
			$user->uid = md5("test_1");
			$user->taobao_account = "false";
			$user->app_key = C("IM_AppKey");

			$req->setUser(json_encode($user));
			$req->setTribeId("117146911");

			$resp = $imTop->execute($req);
			var_dump($resp);

		}

		// 主动加群
		public function joinTribe() {
			$imTop = $this->initIm();
			$req = new \OpenimTribeJoinRequest;
			$user = new \OpenImUser;
			$user->uid = md5("test_2");
			$user->taobao_account = "false";
			$user->app_key = C("IM_AppKey");
			$req->setUser(json_encode($user));
			$req->setTribeId("117146911");

			$resp = $imTop->execute($req);

			var_dump($resp);
		}

		// 退群
		public function leaveTribe() {
      $imTop = $this->initIm();
      $req = new \OpenimTribeQuitRequest;
      $user = new \OpenImUser;
      $user->uid = md5("test_2");
      $user->taobao_account = "false";
      $user->app_key = C("IM_AppKey");
      $req->setUser(json_encode($user));
      $req->setTribeId("117146911");

      $resp = $imTop->execute($req);

      var_dump($resp);	
    }

		// 修改群信息
		public function modifyTribe() {
			$username = "test_2";
			$imTop = $this->initIm();

			$req = new \OpenimTribeModifytribeinfoRequest;
			$user = new \OpenImUser;
			$user->uid = md5($username);
			$user->taobao_account = "false";
			$user->app_key = C("IM_AppKey");
			$req->setUser(json_encode($user));
			$req->setTribeName("333333");
			$req->setNotice("22222");
			$req->setTribeId("117146907");

			$resp = $imTop->execute($req);

			var_dump($resp);
		}

    public function expelTribe() {
      $imTop = $this->initIm();
      $req = new \OpenimTribeExpelRequest;
      $user = new \OpenImUser;
      $user->uid = md5("test_1");
      $user->taobao_account = "false";
      $user->app_key = C("IM_AppKey");
      $req->setUser(json_encode($user));
      $req->setTribeId('117146911');
      $member = new \OpenImUser;
      $member->uid = md5("test_2");
      $member->taobao_account = "false";
      $member->app_key = C("IM_AppKey");
      $req->setMember(json_encode($member));
      $resp = $imTop->execute($req);

      var_dump($resp);
    }

		// 测试
		public function demo() {
			echo md5("test_1");
			echo "\n\n==========";
			echo md5("test_2");
		}

	}

?>