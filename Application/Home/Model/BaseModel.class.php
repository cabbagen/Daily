<?php 
	namespace Home\Model;
	use Think\Model;

	class BaseModel extends Model {

		private $databasePrefix = "think_"; 

		private function adapterCategoryCondition($tableName, $itemId) {
			$queryCondtion = array();
			switch ($tableName) {
				case 'Folders':
					array_push($queryCondtion, 'think_files on think_folders.id = think_files.from_folder_id');
					array_push($queryCondtion, array('think_folders.id' => $itemId));
					break;
				case 'Calendars':
					array_push($queryCondtion, 'think_affairs on think_calendars.id = think_affairs.from_calendar_id');
					array_push($queryCondtion, array('think_calendars.id' => $itemId));
					break;
				case 'Categorys':
					array_push($queryCondtion, array(
						'think_friends on think_categorys.id = think_friends.from_category_id', 
						'think_users on think_users.id = think_friends.friend_id'
					));
					array_push($queryCondtion, array('think_categorys.id' => $itemId));
					break;
				default:
					break;
			}

			return $queryCondtion;
		}

		protected function getWeekStart() {
			$date = getdate(time());
			$day = $date['wday'] == 0 ? $date['mday'] - 6 : $date['mday'] - $date['wday'] + 1;

			$startWeekDay = (new \DateTime("now", (new \DateTimeZone('Asia/Shanghai'))))
				->setDate($date['year'], $date['mon'], $day)
				->format('Y-m-d');

			return $startWeekDay;
		}

		protected function getWeekEnd() {
			$date = getdate(time());
			$day = $date['wday'] == 0 ? $date['mday'] : $date['mday'] + 7 - $date['wday'];

			$endWeekDay = (new \DateTime("now", (new \DateTimeZone('Asia/Shanghai'))))
				->setDate($date['year'], $date['mon'], $day)
				->format('Y-m-d');

			return $endWeekDay;
		}

		protected function getUserId() {
			return session('userId');
		}
		
		// 初始化页面时，获取用户相关信息
		public function getUserMenuCatetoryInfosFromModel($tableName, $returnField) {
			$fullTableName = $this->databasePrefix . $tableName;
			if($tableName == 'Calendars') {
				$queryCondtion = array(
					'from_user_id' => $this->getUserId(),
					'create_time' => array('between', array($this->getWeekStart(), $this->getWeekEnd())),
				);
			} else {
				$queryCondtion = array(
					'from_user_id' => $this->getUserId(),
				);
			}

			$result = $this->table($fullTableName)->where($queryCondtion)->select();
			return $result;
		}

		// 获取分类具体信息列表
		public function getCategoryItemFromModel($tableName, $itemId) {
			$fullTableName = $this->databasePrefix . $tableName;
			$queryCondtion = $this->adapterCategoryCondition($tableName, $itemId);

			$result = $this->table($fullTableName)->where($queryCondtion[1])->join($queryCondtion[0])->select();

			return $result;
		}

		// 修改确认一级分类
		public function cofirmModifyNameFromModel($receiveArray) {
			$fullTableName = $this->databasePrefix . $receiveArray['type'];
			return $this->table($fullTableName)->save($receiveArray);
		}

		// 删除一级分类
		public function deleteItemFromModel($receiveArray) {
			$fullTableName = $this->databasePrefix . $receiveArray['type'];
			if( $fullTableName == 'think_Categorys' ) {
				$isHasFriends = D('Friends')->hasFriendsFromCategory($receiveArray['id']);
				if($isHasFriends) {
					return false;
				}
			}
			return $this->table($fullTableName)->delete($receiveArray['id']);
		}

		// 添加一级分类
		public function addItemFromModel($receiveArray) {
			$fullTableName = $this->databasePrefix . $receiveArray['type'];
			return $this->table($fullTableName)->add($receiveArray);
		}

		

	}

?>