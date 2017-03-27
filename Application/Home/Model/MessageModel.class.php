<?php
	namespace Home\Model;
	use Home\Model;

	class MessageModel extends BaseModel {
    
    public function addMessage($msgArray) {
      return $this->data($msgArray)->add();
    }

    public function getMessage($toUserId) {
      return $this->where(array(
        'to_user_id' => $toUserId
      ))->join('think_users on think_users.id = think_message.to_user_id')->find();
    }

    public function deleteMessage($toUserId) {
      return $this->where(array(
        'to_user_id' => $toUserId,
      ))->delete();
    }
		
	}
	
?>