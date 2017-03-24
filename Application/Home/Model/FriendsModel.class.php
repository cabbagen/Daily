<?php 
  namespace Home\Model;
	use Home\Model;
  
  class FriendsModel extends BaseModel {

    public function searchFriends($start = 0, $length = 6, $keyWord) {

      if(strlen($keyWord) == 0) {
        $sql = "select think_users.id, think_users.username, think_users.avator, think_users.extra, think_users.nickname, 1 as is_added from think_users " . 
        "join think_friends on think_users.id = think_friends.friend_id " . 
        "where think_friends.user_id = 1 " . 
        "union " . 
        "select think_users.id, think_users.username, think_users.avator, think_users.extra, think_users.nickname, 0 as is_added from think_users " . 
        "join think_friends on think_users.id != think_friends.friend_id " . 
        "where think_friends.user_id = 1 " . 
        "limit $start, $length";
      } else {
        $sql = "select think_users.id, think_users.username, think_users.avator, think_users.extra, think_users.nickname, 1 as is_added from think_users " . 
        "join think_friends on think_users.id = think_friends.friend_id " . 
        "where think_friends.user_id = 1 and think_users.username like '%$keyWord%' " . 
        "union " . 
        "select think_users.id, think_users.username, think_users.avator, think_users.extra, think_users.nickname, 0 as is_added from think_users " . 
        "join think_friends on think_users.id != think_friends.friend_id " . 
        "where think_friends.user_id = 1 and think_users.username like '%$keyWord%' " . 
        "limit $start, $length";
      }

      return $this->query($sql);
    }

  }
?>