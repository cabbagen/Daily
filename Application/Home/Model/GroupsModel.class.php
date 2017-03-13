<?php
	namespace Home\Model;
	use Home\Model;

	class GroupsModel extends BaseModel {

		// 查看小组成员，这里从 IM 服务器端获取
		public function getCategoryItemFromModel($tableName, $itemId) {
			echo "$tableName  ||  $itemId";
		}

		

	}
	
?>