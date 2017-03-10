<?php
	namespace Home\Controller;
	use Home\Controller;
	Vendor('imSdk.TopSdk');

	class AppController extends InitController {

		private function getImUserInfoFromSession() {
			$userModel = D('Users');
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
			$userModel = D('Users');

			return $userModel->getUserInfo(array(
				'username' => session('username'),
			));
		}

		private function getUserMenuCatetoryInfos($dbTofiled) {
			$userCategoryInfos = array();
			foreach ($dbTofiled as $key => $value) {
				$categoryInfo = D($key)->getUserMenuCatetoryInfosFromModel($key, $value);
				if($categoryInfo) {
					$userCategoryInfos[$key] = $categoryInfo;
				} else {
					$userCategoryInfos[$key] = array();
				}
			}

			return $userCategoryInfos;
		}

		// 渲染页面函数
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

		// ajax 请求 用户左侧菜单相关信息
		public function getUserMenuInfos() {
			$userMenuInfosQueryConditon = $this->getUserMenuCatetoryInfos(array(
				'Folders' => 'folder_name',
				'Calendars' => 'calendar_name',
				'Categorys' => 'category_name',
				'Groups' => 'group_name',
			));

			$this->ajaxReturn(array(
				'status' => 200,
				'data' => $userMenuInfosQueryConditon
			));

		}



		// ====================================================================

		// 当用户点击左侧菜单分类时，获取获取对应的资源数据
		// 分类起名字的时候 要禁止特殊符号
		public function getUserCategoryResource() {
			$this->allowCrossOrigin();

			if(I('resourceCategory', null) && I('id', null)) {
				$result = $this->getCategoryItem(I('resourceCategory', null), I('id', null));
				if($result || empty($result)) {
					$this->ajaxReturn(array(
						'status' => 200,
						'data' => $result,
					));
				} else {
					$this->ajaxReturnError();
				}
			} else {
				$this->ajaxReturnError();
			}
		}

		// 查询对应类别的文件
		private function getCategoryItem($tableName, $itemId) {
			$tableName = ucfirst($tableName);
			$itemInfoList = D($tableName)->getCategoryItemFromModel($tableName, $itemId);

			return $itemInfoList;

		}

		// 测试 demo

		public function demo() {
			$this->ajaxReturn(array('status' => 'ok'));
		}
	}


?>
