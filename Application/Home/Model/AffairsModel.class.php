<?php
	namespace Home\Model;
	use Home\Model;

	class AffairsModel extends BaseModel {

		public function deleteAffair($affairId) {
			return $this->delete($affairId);
		}

		public function updateAffair($updateArray) {
			return $this->where(array('id' => $updateArray['id']))->setField('affair_content', $updateArray['affair_content']);
		}
	}
?>