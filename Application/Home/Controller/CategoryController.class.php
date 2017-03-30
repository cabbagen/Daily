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

    // 添加好友，并且拉取查询数据
    // public function addFriendAndQueryUsers() {
    //   $userId = $this->getUserIdFromSession();
    //   $addResult = D('Friends')->addFriend(array(
    //     'from_category_id' => I('post.from_category_id', null),
    //     'user_id' => $userId,
    //     'friend_id' => I('post.friend_id', null),
    //   ));
    //   $friendList = D('Friends')->getCategoryItemFromModel('Categorys', I('post.from_category_id', null));

    //   $queryResult = $this->prePaginationForAddAndDelete( I('post.', null) );

    //   if(is_array($queryResult['userList']) && $addResult) {
    //     $resultUserList = $this->adapterFrinedFromUser($queryResult['userList']);
    //     $this->ajaxReturn(array('status' => 200, 'data' => array(
    //       'searchPage' => array(
    //         'usersList' => $resultUserList,
    //         'totalPage' => $queryResult['totalPage'],
    //         'currentPage' => I('post.currentPage', null)
    //       ),
    //       'friendList' => $friendList
    //     )));
    //   } else {
    //     $this->ajaxReturnError();
    //   }

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

    public function agressAddFriend() {
      $friendFromCategoryId = I('friend_from_category_id', null);
      $friendId = I('friendId', null);
      $userId = $this->getUserIdFromSession();
      $userFromCategoryId = I('from_category_id', null);

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
        'type' => 'arre',
        'from_user_id' => $userId,
        'to_user_id' => $friendId
      ));

      if($addUserResult && $addFriendResult) {
        $this->ajaxReturn(array(
          'status' => 200,
          'msg' => '您已添加成功',
        ));
      } else {
        $this->ajaxReturnError();
      }


    }

    public function rejectAddFriend() {
      $addResult = $this->addMsgNotification(array(
        'type' => I('type', null),
        'from_user_id' => $this->getUserIdFromSession(),
        'to_user_id' => I('to_user_id', null),
      ));
      if($addResult) {
        $this->ajaxReturn(array(
          'status' => 200,
          'msg' => '消息已回复!',
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
    
    

  }

?>