<?php
  namespace Home\Controller;
	use Home\Controller;

  class CategoryController extends BaseController {


    private function adapterFrinedFromUser($userList) {
      $friendModel = D('Friends');
      $adapterUserList = array();

      foreach($userList as $key => $value) {
        $value['is_added'] = $friendModel->searchFriends($value['id']);
        array_push($adapterUserList, $value);
      }

      return $adapterUserList;
    }

    private function prePaginationForAddAndDelete($array) {
      $start = ($array['currentPage'] - 1) * $array['pageSize'];
      $length = $array['pageSize'];
      $keyWord = $array['keyWord'] ? $array['keyWord'] : '';

      return array(
        'userList' => D('Users')->getUsersForPagination($start, $length, $keyWord),
        'totalPage' => D('Users')->getTotalUserCount($keyWord),
      );
    }
    
    // 分页及模糊查询用户名接口
    public function searchFriends() {
      $queryResult = $this->prePaginationForAddAndDelete( I('post.', null) );

      if( is_array($queryResult['userList']) ) {
        $resultUserList = $this->adapterFrinedFromUser($queryResult['userList']);
        $this->ajaxReturn(array('status' => 200, 'data' => array(
          'usersList' => $resultUserList,
          'totalPage' => $queryResult['totalPage'],
          'currentPage' => I('post.currentPage', null)
        )));
      } else {
        $this->ajaxReturnError();
      }
      
    }

    // 添加好友，并向对方发送通知
    public function addFriendAndAddMsg() {
      $addResult = $this->addMsgNotification(array(
        'type' => I('type', null),
        'from_user_id' => $this->getUserIdFromSession(),
        'to_user_id' => I('to_user_id', null),
        'from_category_id' => I('from_category_id', null)
      ));
      if($addResult) {
        $this->ajaxReturn(array(
          'status' => 200,
          'msg' => '消息已发出，正在等待对方响应',
        ));
      } else {
        $this->ajaxReturnError();
      }
    }

    // 同意加好友
    public function agressAddFriend() {
      $friendFromCategoryId = I('friendFromCategoryId', null);
      $friendId = I('friendId', null);
      $userId = $this->getUserIdFromSession();
      $userFromCategoryId = I('fromCategoryId', null);

      $addUserResult = D('Friends')->addFriend(array(
        'user_id' => $userId,
        'from_category_id' => $userFromCategoryId,
        'friend_id' => $friendId,
      ));
      $addFriendResult = D('Friends')->addFriend(array(
        'user_id' => $friendId,
        'from_category_id' => $friendFromCategoryId,
        'friend_id' => $userId,
      ));

      $addMsgResult = $this->addMsgNotification(array(
        'type' => 'agress',
        'from_user_id' => $userId,
        'to_user_id' => $friendId
      ));

      if($addUserResult && $addFriendResult) {
        $this->ajaxReturn(array(
          'status' => 200,
          'msg' => '您已添加成功, 请刷新查看',
        ));
      } else {
        $this->ajaxReturnError();
      }


    }

    // 拒绝加好友
    public function rejectAddFriend() {
      $addResult = $this->addMsgNotification(array(
        'type' => 'reject',
        'from_user_id' => $this->getUserIdFromSession(),
        'to_user_id' => I('to_user_id', null),
      ));
      if($addResult) {
        $this->ajaxReturn(array(
          'status' => 200,
          'msg' => '拒绝消息已回复!',
        ));
      } else {
        $this->ajaxReturnError();
      }
    }

    // 删除数据，并且获取用户列表
    public function deleteFriendAndQueryUsers() {
      $userId = $this->getUserIdFromSession();
      $deleteResult = D('Friends')->deleteFriend(array(
        'user_id' => $userId,
        'friend_id' => I('post.friend_id', null),
      ));
      $deleteResultFriend = D('Friends')->deleteFriend(array(
        'user_id' => I('post.friend_id', null),
        'frined_id' => $userId,
      ));
      $friendList = D('Friends')->getCategoryItemFromModel('Categorys', I('post.from_category_id', null));

      $queryResult = $this->prePaginationForAddAndDelete( I('post.', null) );

      if(is_array($queryResult['userList']) && $deleteResult && $deleteResultFriend) {
        $resultUserList = $this->adapterFrinedFromUser($queryResult['userList']);
        $this->ajaxReturn(array('status' => 200, 'data' => array(
          'searchPage' => array(
            'usersList' => $resultUserList,
            'totalPage' => $queryResult['totalPage'],
            'currentPage' => I('post.currentPage', null)
          ),
          'friendList' => $friendList
        )));
      } else {
        $this->ajaxReturnError();
      }

    }
    
    // 接收未读消息查询好友信息
    public function getFriendInfos() {
      $friendInfos = I('friendInfos', null);
      $friendInfosResult = array();

      if(empty($friendInfos)) {
        $this->ajaxReturn(array('status' => 200, 'friendInfos' => array()));
      }
      
      foreach($friendInfos as $key => $value) {
        $userInfo = D('Users')->getUserInfo(array('im_user_id' => substr($value['contact'], 8)));
        array_push($friendInfosResult, array_merge($value, array(
          'nickname' => $userInfo['nickname'],
          'avator' => $userInfo['avator'],
        )));
      }

      $this->ajaxReturn(array('status' => 200, 'friendInfos' => $friendInfosResult));

    }

    // 接收消息查询好友信息
    public function queryFriendInfo() {
      $uid = I('fromUid', null);
      if($uid) {
        $friendInfo = D('Users')->getUserInfo(array('im_user_id' => substr($uid, 8)));
        if($friendInfo) {
          $this->ajaxReturn(array(
            'status' => 200, 
            'friendInfo' => array_merge($friendInfo, array('timestamp' => time(), 'contact' => $uid)),
          ));
        } else {
          $this->ajaxReturnError();
        }
      } else {
        $this->ajaxReturnError();
      }
    }

    

  }

?>