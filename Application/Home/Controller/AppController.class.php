<?php
  namespace Home\Controller;
  use Home\Controller;
  Vendor('imSdk.TopSdk');

  class AppController extends BaseController {

    private function getImUserInfoFromSession() {
      return $this->getImUserInfoFromUsername( session('username') );
    }

    private function getImUserInfoFromUsername($username) {
      $imTop = D('Users')->initIm();
      $uid = md5( $username );

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
      return D('Users')->getUserInfo(array(
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
          // 若当前用户菜单分类查询不到，则使用一个空数组
          $userCategoryInfos[$key] = array();
        }
      }
      return $userCategoryInfos;
    }

    // 查询用户菜单分类二级条目
    private function getCategoryItem($tableName, $itemId) {
      $tableName = ucfirst($tableName);
      $itemInfoList = D($tableName)->getCategoryItemFromModel($tableName, $itemId);

      return $itemInfoList;
    }

    private function getUserMenuInfos() {
      $userMenuInfosQueryConditon = $this->getUserMenuCatetoryInfos(array(
        'Folders' => 'folder_name',
        'Calendars' => 'calendar_name',
        'Categorys' => 'category_name',
        'Groups' => 'group_name',
      ));
      // 补加上分享的部分
      $userMenuInfosQueryConditon['Shares'] = array(
        array('id' => 1, 'share_name' => '来自我的分享',),
        array('id' => 2, 'share_name' => '我收到的分享',)
      );

      return $userMenuInfosQueryConditon;

    }

    // 渲染页面函数
    public function app() {
      $imUserInfos = $this->getImUserInfoFromSession();
      $userInfos = $this->getUserInfoFromSession();

      if($imUserInfos && $userInfos) {
        $userInfo = array(
          'uid' => $imUserInfos->userid,
          'appkey' => C('IM_AppKey'),
          'credential' => $imUserInfos->password,
          'nickName' => $userInfos['nickname'],
          'userId' => $userInfos['id'],
          'avator' => $userInfos['avator'],
        );
        $this->assign('userInfo', json_encode($userInfo));
        $this->assign('menuCategoryInfos', json_encode($this->getUserMenuInfos()));

        $this->display();
      } else {
        $this->redirect('Login/loginAccount');
      }

    }

    // 当用户点击左侧菜单分类时，获取获取对应的资源数据
    public function getUserCategoryResource() {
      if(I('resourceCategory', null) && I('id', null)) {
        $result = $this->getCategoryItem(I('resourceCategory', null), I('id', null));
        if($result || empty($result)) {
          $this->ajaxReturn(array('status' => 200, 'data' => array(
            'content' => $result,
            'id' => I('id', null),
          )));
        } else {
          $this->ajaxReturnError();
        }
      } else {
        $this->ajaxReturnError();
      }
    }

    // 确认修改一级菜单子项内容
    public function confirmModify() {
      $result = D(I('confirmObject')['type'])->cofirmModifyNameFromModel(I('confirmObject'));
      if($result) {
        $updateData = $this->getUserMenuCatetoryInfos(array(
          I('confirmObject')['type'] => lcfirst( I('confirmObject')['type'] ) . '_name',
        ));
        $this->ajaxReturn(array('status' => 200, 'data' => $updateData));
      } else {
        $this->ajaxReturn(array('status' => 500, 'msg' => '您当前不能执行该操作' ));				
      }
    }

    // 添加一级菜单子项
    public function addItem() {
      $result = D(I('addItemObject')['type'])->addItemFromModel(I('addItemObject'));
      if($result) {
        $updateData = $this->getUserMenuCatetoryInfos(array(
          I('addItemObject')['type'] => lcfirst( I('addItemObject')['type'] ) . '_name',
        ));
        $this->ajaxReturn(array('status' => 200, 'data' => $updateData));
      } else {
        $this->ajaxReturnError();
      }
    }


    // 删除一级菜单子项
    public function deleteItem() {
      $result = D(I('deleteItemObject')['type'])->deleteItemFromModel(I('deleteItemObject'));
      if($result) {
        $updateData = $this->getUserMenuCatetoryInfos(array(
          I('deleteItemObject')['type'] => lcfirst( I('deleteItemObject')['type'] ) . '_name',
        ));
        $this->ajaxReturn(array('status' => 200, 'data' => $updateData));
      } else {
        $this->ajaxReturn(array('status' => 500, 'msg' => '您当前不能执行该操作' ));
      }
    }

    // chat 窗口
    public function chat() {
      $frindId = I('get.friendId', null);
      $frindUsername = D('Users')->getUserInfo(array('id' => $frindId))['username'];
      
      $selfImInfo = $this->getImUserInfoFromSession();
      $toImInfo = $this->getImUserInfoFromUsername($frindUsername);

      if($selfImInfo && $toImInfo && 0) {
        $this->assign('imInfos', json_encode(array(
          'uid' => $selfImInfo->userid,
          'appkey' => C('IM_AppKey'),
          'credential' => $selfImInfo->password,
          'touid' => $toImInfo->userid,
        )));
      } else {
        $this->assign('errorTip', '服务器繁忙，请稍后重试！');
      }

      $this->display();
    }

    public function demo() {
      $this->display();
    }

  }


?>
