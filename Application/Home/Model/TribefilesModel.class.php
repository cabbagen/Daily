<?php
	namespace Home\Model;
	use Home\Model;
  
  class TribefilesModel extends BaseModel {

    // 获取群文件
    public function getTribeFiles($tribeId) {
      $sql = "select *, think_tribefiles.id as tribe_id from think_tribefiles join " . 
        "think_files on think_files.id = think_tribefiles.group_file_id where " . 
        "think_tribefiles.im_tribe_id = '$tribeId'";

      return $this->query($sql);
    }

    // 删除群文件
    public function deleteTribeFile($tribeFileId) {
      return $this->delete($tribeFileId);
    }

    // 添加群文件
    public function addTribeFile($imTribeId, $fileId) {
      $groupInfo = $this->table('think_groups')->where(array('im_tribe_id' => $imTribeId))->find();
      return $this->data(array(
        'from_group_id' => $groupInfo['id'],
        'group_file_id' => $fileId,
        'im_tribe_id' => $imTribeId,
      ))->add();
    }

    

  }


?>