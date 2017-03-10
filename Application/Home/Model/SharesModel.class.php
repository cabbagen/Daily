<?php
	namespace Home\Model;
	use Home\Model;

	class SharesModel extends BaseModel {

		private $fromUserInvitation = "1";

		private $toUserInvitation = "2";

		private $userId = 1;

		// 查看分享记录，直接查询对应的数据表即可
		public function getCategoryItemFromModel($tableName, $itemId) {
			$queryCodition = array();
			if($itemId == $this->fromUserInvitation) {
				$queryCodition['from_id'] = $this->userId;
				echo "我发出的分享 <br />";
			} else if($itemId == $this->toUserInvitation) {
				$queryCodition['to_id'] = $this->userId;
				echo "我收到的分享 <br />";
			}

			$result = $this->where($queryCodition)->join('think_files on think_shares.file_id = think_files.id')->select();

			var_dump($result);
		}

		
	}
	
?>