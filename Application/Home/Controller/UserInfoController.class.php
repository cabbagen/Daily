<?php 
	namespace Home\Controller;
	use Home\Controller;

	class UserInfoController extends BaseController {

		public function users() {
			$userId = $this->getUserIdFromSession();
			$userInfo = D('Users')->getUserInfo(array('id' => $userId));

			if($userInfo['gender'] == 'F') {
				$userInfo['gender'] = '男';
			} else if($userInfo['gender'] == 'M') {
				$userInfo['gender'] = '女';
			} else {
				$userInfo['gender'] = '未知';
			}

			$this->assign('userInfo', $userInfo);
			$this->display();
		}

		public function changeInfo() {
			$result = D('Users')->changeUserInfo(I('post.', null));
			if($result) {
				$userInfo = D('Users')->getUserInfo(array('id' => $this->getUserIdFromSession()));
				$this->ajaxReturn(array('status' => 200, 'userInfo' => $userInfo));
			} else {
				$this->ajaxReturnError();
			}
		}

	}


?>