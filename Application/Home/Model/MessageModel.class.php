<?php
	namespace Home\Model;
	use Home\Model;

	class MessageModel extends BaseModel {

    private function getAddFriendMessage($toUserId) {
      $sql = "select *, think_message.id as msgId from think_message join " .
        "think_users on think_users.id = think_message.from_user_id where " . 
        "think_message.to_user_id = $toUserId and think_message.type != 'addTribe' limit 1";
      
      return $this->query($sql);  
    }

    private function getAddTribeMessage($toUserId) {
      $sql = "select *, think_message.id as msgId from think_message join " .
        "think_groups on think_groups.im_tribe_id = think_message.im_tribe_id where " . 
        "think_message.to_user_id = $toUserId and think_message.type != 'addFriend' limit 1";
      
      return $this->query($sql);
    }
    
    public function addMessage($msgArray) {
      return $this->data($msgArray)->add();
    }

    public function getMessage($toUserId) {
      if( $this->getAddFriendMessage($toUserId) ) {
        return $this->getAddFriendMessage($toUserId);
      } else {
        return $this->getAddTribeMessage($toUserId);
      }
    }

    public function deleteMessage($msgId) {
      return $this->delete($msgId);
    }
		
	}
	
?>