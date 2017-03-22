<?php
	namespace Home\Model;
	use Home\Model;

	class AffairsModel extends BaseModel {

		private function adapterEventCount($selectArray, $field) {
			$result = array();

			foreach($selectArray as $key => $value) {
				switch($value['affair_type']) {
					case '1':
						$result['重要且紧急的事情'] = $value[$field];
					break;
					case '2':
						$result['重要不紧急的事情'] = $value[$field];
					break;
					case '3':
						$result['不重要紧急的事情'] = $value[$field];
					break;
					case '4':
						$result['不重要不紧急的事情'] = $value[$field];
					break;							
				}
			}

			return $result;
		}

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

		public function completeAffair($affairId) {
			return $this->where(array('id' => $affairId))->setField('is_complete', 2);
		}

		public function cancelCompleteAffair($affairId) {
			return $this->where(array('id' => $affairId))->setField('is_complete', 1);
		}

		public function getDayAffair($timestamp) {
			$year = getdate($timestamp)['year'];
			$month = getdate($timestamp)['mon'];
			$day = getdate($timestamp)['mday'];

			$dayStartDate = (new \DateTime("now", (new \DateTimeZone('Asia/Shanghai'))))->setDate($year, $month, $day)->format('Y-m-d');
			$dayEndDate = (new \DateTime("now", (new \DateTimeZone('Asia/Shanghai'))))->setDate($year, $month, $day + 1)->format('Y-m-d');

			return $this->where(array(
				'affair_time' => array('between', array($dayStartDate, $dayEndDate)),
			))->select();
		}

		public function getCompleteRate() {
			$weekStartDay = $this->getWeekStart();
			$weekEndDay = $this->getWeekEnd();

			$queryUpCompleteDataSql = "select affair_type, count(is_complete) as un_complete from think_affairs " .
				"where is_complete = 1 and affair_time between '$weekStartDay' and '$weekEndDay' group by affair_type";

			$queryCompleteDataSql = "select affair_type, count(is_complete) as complete from think_affairs " .
				"where is_complete = 2 and affair_time between '$weekStartDay' and '$weekEndDay' group by affair_type";

			$unCompleteData = $this->query($queryUpCompleteDataSql);
			$completeDate = $this->query($queryCompleteDataSql);

			if(is_array($unCompleteData) && is_array($completeDate)) {
				return array(
					'unCompleteData' => $this->adapterEventCount($unCompleteData, 'un_complete'),
					'completeData' => $this->adapterEventCount($completeDate, 'complete')
				);
			} else {
				return false;
			}
		}

		
		
	}

?>