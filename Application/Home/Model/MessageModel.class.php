<?php
	namespace Home\Model;
	use Home\Model;

	class MessageModel extends BaseModel {
    
    public function addMessage($msgArray) {
      return $this->data($msgArray)->add();
    }

    public function getMessage() {
      return $this->find();
    }
		
	}
	
?>