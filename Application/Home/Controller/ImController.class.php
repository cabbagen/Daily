<?php
	namespace Home\Controller;
	use Home\Controller;
	Vendor('imSdk.TopSdk');

	class ImController extends BaseController {
		protected function initIm() {
			$imTop = new \TopClient;
			$imTop->appkey = C('IM_AppKey');
			$imTop->secretKey = C('IM_AppSecret');
			$imTop->format = 'json';

			return $imTop;
		}

		protected function imAddUser($userinfoArray) {
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
	}