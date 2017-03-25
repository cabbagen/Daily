<?php 
  namespace Home\Model;
	use Home\Model;
  
  class FriendsModel extends BaseModel {

    public function searchFriends($friendId) {
      $userId = $this->getUserId();
      $result = $this->where( array('user_id' => $userId, 'friend_id' => $friendId) )->find();

      return $result ? 1 : 0;
    }

    public function addFriend($friendInfoArray) {
      return $this->data($friendInfoArray)->add();
    }

    public function deleteFriend($friendInfoArray) {
      return $this->where($friendInfoArray)->delete();
    }
  }
?>