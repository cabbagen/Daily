<?php
	namespace Home\Model;
	use Home\Model;

	class SharesModel extends BaseModel {

		private $fromUserInvitation = "1";

		private $toUserInvitation = "2";

		// 查看分享记录，直接查询对应的数据表即可
		public function getCategoryItemFromModel($tableName, $itemId) {
			if($itemId == $this->fromUserInvitation) {
				// 我发出的分享
				$shareResult = $this->where(array('from_user_id' => $this->getUserId()))
					->join('think_files on think_files.id = think_shares.share_file_id')
					->select();
			} else {
				// 我收到的分享
				$shareResult = $this->where(array('to_user_id' => $this->getUserId()))
					->join('think_files on think_files.id = think_shares.share_file_id')
					->select();
			}

			return $shareResult;
		}

		public function deleteShareFile($shareFileId, $shareType) {
			$condition = array('share_file_id' => $shareFileId);
			if($shareType == $this->fromUserInvitation) {
				$condition['from_user_id'] = $this->getUserId();
			} else {
				$condition['to_user_id'] = $this->getUserId();
			}

			return $this->where($condition)->delete();
		}

		
	}
	
?>