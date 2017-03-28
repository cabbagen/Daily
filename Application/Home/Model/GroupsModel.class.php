<?php
	namespace Home\Model;
	use Home\Model;
	Vendor('imSdk.TopSdk');

	class GroupsModel extends BaseModel {

		// 初始化 IM 
		private function initIm() {
			$imTop = new \TopClient;
			$imTop->appkey = C('IM_AppKey');
			$imTop->secretKey = C('IM_AppSecret');
			$imTop->format = 'json';

			return $imTop;
		}

		// 获取群列表
		private function getTribeList() {
			$username = session("username");
			$imTop = $this->initIm();
			$req = new \OpenimTribeGetalltribesRequest;
			$user = new \OpenImUser;
			$user->uid = md5($username);
			$user->taobao_account = "false";
			$user->app_key = C("IM_AppKey");
			$req->setUser(json_encode($user));
			$req->setTribeTypes("0");
			$resp = $imTop->execute($req);

			if($resp->tribe_info_list) {
				return $resp->tribe_info_list->tribe_info;
			} else {
				return false;
			}
		}

		// 创建群
		private function createImTribe($tribeName) {
			$username = session("username");
			$imTop = $this->initIm();
			$req = new \OpenimTribeCreateRequest();
			$user = new \OpenImUser;
			$user->uid = md5($username);
			$user->taobao_account = "false";
			$user->app_key = C("IM_AppKey");
			$req->setUser(json_encode($user));
			$req->setTribeName($tribeName);
			$req->setNotice($tribeName);
			$req->setTribeType("0");
			$members->uid = md5($username);
			$members->taobao_account = "false";
			$members->app_key = C("IM_AppKey");

			$req->setMembers(json_encode($members));
			$resp = $imTop->execute($req);

			if($resp->tribe_info) {
				return $resp->tribe_info;
			} else {
				return false;
			}
		}

		// 修改群信息
		private function modifyTribe($tribeId, $tribeName) {
			$username = session("username");
			$imTop = $this->initIm();

			$req = new \OpenimTribeModifytribeinfoRequest;
			$user = new \OpenImUser;
			$user->uid = md5($username);
			$user->taobao_account = "false";
			$user->app_key = C("IM_AppKey");
			$req->setUser(json_encode($user));
			$req->setTribeName($tribeName);
			$req->setNotice($tribeName);
			$req->setTribeId($tribeId);

			$resp = $imTop->execute($req);

			if(isset($resp->tribe_code)) {
				return true;
			} else {
				return false;
			}

		}

		// 删除群
		private function deleteTribe($tribeId) {
			$username = session("username");
			$imTop = $this->initIm();
			$req = new \OpenimTribeDismissRequest;
			$user = new \OpenImUser;
			$user->uid = md5($username);
			$user->taobao_account = "false";
			$user->app_key = C("IM_AppKey");

			$req->setUser(json_encode($user));
			$req->setTribeId($tribeId);

			$resp = $imTop->execute($req);

			if(isset($resp->tribe_code)) {
				return true;
			} else {
				return false;
			}
		}

		// 加入群
		private function joinTribe($tribeId) {
			$username = session("username");
			$imTop = $this->initIm();
			$req = new \OpenimTribeJoinRequest;
			$user = new \OpenImUser;
			$user->uid = md5($username);
			$user->taobao_account = "false";
			$user->app_key = C("IM_AppKey");
			$req->setUser(json_encode($user));
			$req->setTribeId($tribeId);

			$resp = $imTop->execute($req);

			if(isset($resp->tribe_id)) {
				return true;
			} else {
				return false;
			}
		}

		// 退出群
		private function leaveTribe($tribeId) {
			$username = session("username");
			$imTop = $this->initIm();
			$req = new \OpenimTribeQuitRequest;
			$user = new \OpenImUser;
			$user->uid = mds($username);
			$user->taobao_account = "false";
			$user->app_key = C("IM_AppKey");
			$req->setUser(json_encode($user));
			$req->setTribeId($tribeId);

			$resp = $imTop->execute($req);

			if(isset($resp->tribe_id)) {
				return true;
			} else {
				return false;
			}		
		}

		// 踢人
		private function expelTribe() {

		}

		// 获取一级菜单接口
		public function getUserMenuCatetoryInfosFromModel($tableName, $returnField) {
			$imTribeList = $this->getTribeList();
			if($imTribeList) {
				return $imTribeList;
			} else {
				return false;
			}
		}

		// 添加小组
		public function addItemFromModel($ajaxArray) {
			$tribeName = $ajaxArray['group_name'];
			$fromUserId = $ajaxArray['from_user_id'];
			$imCreateTribe = $this->createImTribe($tribeName);

			if($imCreateTribe) {
				return $this->data(array(
					'group_name' => $imCreateTribe->name,
					'from_user_id' => $fromUserId,
					'im_tribe_id' => $imCreateTribe->tribe_id, 
				))->add();
			} else {
				return false;
			}
		}

		// 确认修改名称
		public function cofirmModifyNameFromModel($ajaxArray) {
			$tribeId = $ajaxArray['id'];
			$tribeName = $ajaxArray['group_name'];
			$imModifyTribe = $this->modifyTribe($tribeId, $tribeName);

			if($imModifyTribe) {
				return $this->where(array('im_tribe_id' => $tribeId))->save(array('group_name' => $tribeName));
			} else {
				return false;
			}
		}

		// 删除
		public function deleteItemFromModel($ajaxArray) {
			$groupId = $ajaxArray['id'];
			$imDeleteTribe = $this->deleteTribe($groupId);

			if($imDeleteTribe) {
				return $this->where(array('im_tribe_id' => $groupId))->delete();
			} else {
				return false;
			}
		}

		// 查看小组成员，这里从 IM 服务器端获取
		public function getCategoryItemFromModel($tableName, $itemId) {
			echo "$tableName  ||  $itemId";
		}

		

	}
	
?>