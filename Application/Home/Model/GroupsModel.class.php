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
    public function getTribeList() {
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
    public function createImTribe($tribeName) {
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
    public function modifyTribe($tribeId, $tribeName) {
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
    public function deleteTribe($tribeId) {
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
    public function joinTribe($tribeId) {
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

      if(isset($resp->tribe_code)) {
        return true;
      } else {
        return false;
      }
    }

    // 退出群
    public function leaveTribe($tribeId) {
      $username = session("username");
      $imTop = $this->initIm();
      $req = new \OpenimTribeQuitRequest;
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

    // 踢人
    public function expelTribe($tribeId, $expelUserName) {
      $username = session("username");
      $imTop = $this->initIm();
      $req = new \OpenimTribeExpelRequest;
      $user = new \OpenImUser;
      $user->uid = md5($username);
      $user->taobao_account = "false";
      $user->app_key = C("IM_AppKey");
      $req->setUser(json_encode($user));
      $req->setTribeId($tribeId);
      $member = new \OpenImUser;
      $member->uid = md5($expelUserName);
      $member->taobao_account = "false";
      $member->app_key = C("IM_AppKey");
      $req->setMember(json_encode($member));
      $resp = $imTop->execute($req);

      if(isset($resp->tribe_code)) {
        return true;
      } else {
        return false;
      }
    }

    // 获取群成员
    public function getTribeMembers($tribeId) {
      $username = session("username");
      $imTop = $this->initIm();
      $req = new \OpenimTribeGetmembersRequest;
      $user = new \OpenImUser;
      $user->uid = md5($username);
      $user->taobao_account = "false";
      $user->app_key = C("IM_AppKey");

      $req->setUser(json_encode($user));
      $req->setTribeId($tribeId);
      $resp = $imTop->execute($req);

      if($resp->tribe_user_list) {
        return $resp->tribe_user_list->tribe_user;
      } else {
        return false;
      }
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
      $imMembers = $this->getTribeMembers($itemId);
      $username = session("username");
      $memberResult = array();
      if($imMembers) {
        // $users = D('Users')->where(array('username' => array('NEQ', $username)))->select();
        // 稍后修改
        $users = D('Users')->select();
        foreach($users as $key=>$val) {
          foreach($imMembers as $k=>$v) {
            if( md5($val['username']) == $v->uid) {
              array_push($memberResult, $val);
            }
          }
        }
        return $memberResult;
      } else {
        return false;
      }
    }

    public function checkTribeAdmin($tribeId) {
      $groupInfo = $this->where(array('im_tribe_id' => $tribeId))->find();
      if($groupInfo) {
        return ($groupInfo['from_user_id'] == $this->getUserId());
      } else {
        return false;
      }
    }

    public function getTribeAdminInfo($tribeId) {
      return $this->where(array('im_tribe_id' => $tribeId))
        ->join('think_users on think_groups.from_user_id = think_users.id')
        ->find();
    }

    

  }
  
?>