<?php
	namespace Home\Model;
	use Home\Model;

	class MessageModel extends BaseModel {
    
    public function addMessage($msgArray) {
      return $this->data($msgArray)->add();
    }

    public function getMessage($toUserId) {
      $sql = "select *, think_message.id as msgId from think_message join " . 
        "think_users on think_users.id = think_message.to_user_id where " . 
        "think_message.to_user_id = $toUserId limit 1";

      return $this->query($sql);
    }

    public function deleteMessage($msgId) {
      return $this->delete($msgId);
    }
		
	}
	
?>