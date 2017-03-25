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

		public function addImUser() {
			$imTop = $this->initIm();
			$req = new \OpenimUsersAddRequest;
			$userinfos = new \UserInfos;
			$userinfos->nick="king";
			$userinfos->email="uid@taobao.com";
			$userinfos->mobile="18600000000";
			$userinfos->taobaoid="tbnick123";
			$userinfos->userid="imuser123";
			$userinfos->password="xxxxxx";
			$userinfos->remark="demo";
			$userinfos->extra="{}";
			$userinfos->career="demo";
			$userinfos->vip="{}";
			$userinfos->address="demo";
			$userinfos->name="demo";
			$userinfos->age="123";
			$userinfos->gender="M";
			$userinfos->wechat="demo";
			$userinfos->qq="demo";
			$userinfos->weibo="demo";

			$req->setUserinfos(json_encode($userinfos));
			$resp = $imTop->execute($req);

			var_dump($resp);
		}

		public function queryUserFromIm() {
			$imTop = $this->initIm();
			$req = new \OpenimUsersGetRequest;
			$req->setUserids("4e70ffa82fbe886e3c4ac00ac374c29b");
			$resq = $imTop->execute($req);

			var_dump($resq->userinfos);
		}
	}