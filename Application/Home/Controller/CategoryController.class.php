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
    
    // 分页及模糊查询用户名接口
    public function searchFriends() {
      $start = ( I('currentPage', null) - 1 ) * I('pageSize', null);
      $length = I('pageSize', null);
      $keyWord = I('keyWord', null) ? I('keyWord', null) : '';

      $userList = D('Users')->getUsersForPagination($start, $length, $keyWord);
      $totalPage = D('Users')->getTotalUserCount($keyWord);

      if(is_array($userList)) {
        $resultUserList = $this->adapterFrinedFromUser($userList);
        $this->ajaxReturn(array('status' => 200, 'data' => array(
          'usersList' => $resultUserList,
          'totalPage' => $totalPage,
          'currentPage' => I('currentPage', null)
        )));
      } else {
        $this->ajaxReturnError();
      }
      
    }

    // 添加好友，并且拉取查询数据
    public function addFriendAndQueryUsers() {
      $userId = $this->getUserIdFromSession();
      $start = ( I('currentPage', null) - 1 ) * I('pageSize', null);
      $length = I('pageSize', null);
      $keyWord = I('keyWord', null) ? I('keyWord', null) : '';

      $addResult = D('Friends')->addFriend(array(
        'from_category_id' => I('from_category_id', null),
        'user_id' => $userId,
        'friend_id' => I('friend_id', null),
      ));
      $friendList = D('Friends')->getCategoryItemFromModel('Categorys', I('from_category_id', null));

      $userList = D('Users')->getUsersForPagination($start, $length, $keyWord);
      $totalPage = D('Users')->getTotalUserCount($keyWord);

      if(is_array($userList) && $addResult) {
        $resultUserList = $this->adapterFrinedFromUser($userList);
        $this->ajaxReturn(array('status' => 200, 'data' => array(
          'searchPage' => array(
            'usersList' => $resultUserList,
            'totalPage' => $totalPage,
            'currentPage' => I('currentPage', null)
          ),
          'friendList' => $friendList
        )));
      } else {
        $this->ajaxReturnError();
      }

    }

    // 删除数据，并且获取用户列表
    public function deleteFriendAndQueryUsers() {
      $userId = $this->getUserIdFromSession();

      $start = ( I('currentPage', null) - 1 ) * I('pageSize', null);
      $length = I('pageSize', null);
      $keyWord = I('keyWord', null) ? I('keyWord', null) : '';

      $deleteResult = D('Friends')->deleteFriend(array(
        'user_id' => $userId,
        'friend_id' => I('friend_id', null),
      ));
      $friendList = D('Friends')->getCategoryItemFromModel('Categorys', I('from_category_id', null));

      $userList = D('Users')->getUsersForPagination($start, $length, $keyWord);
      $totalPage = D('Users')->getTotalUserCount($keyWord);

      if(is_array($userList) && $deleteResult) {
        $resultUserList = $this->adapterFrinedFromUser($userList);
        $this->ajaxReturn(array('status' => 200, 'data' => array(
          'searchPage' => array(
            'usersList' => $resultUserList,
            'totalPage' => $totalPage,
            'currentPage' => I('currentPage', null)
          ),
          'friendList' => $friendList
        )));
      } else {
        $this->ajaxReturnError();
      }

    }
    
    

  }

?>