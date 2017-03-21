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

		public function getMonthAffair($timestamp) {
			$year = getdate($timestamp)['year'];
			$month = getdate($timestamp)['mon'];
			$day = 1;

			$monthStartDate = (new \DateTime("now", (new \DateTimeZone('Asia/Shanghai'))))->setDate($year, $month, $day)->format('Y-m-d');
			$monthEndDate = (new \DateTime("now", (new \DateTimeZone('Asia/Shanghai'))))->setDate($year, $month + 1, $day)->format('Y-m-d');

			return $this->where(array(
				'affair_time' => array('between', array($monthStartDate, $monthEndDate)),
			))->select();
		}

		public function addAffair($addAffairArray) {
			return $this->data($addAffairArray)->add();
		}
	}
?>