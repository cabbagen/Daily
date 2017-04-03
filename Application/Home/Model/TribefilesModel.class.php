<?php
	namespace Home\Model;
	use Home\Model;
  
  class TribefilesModel extends BaseModel {

    // 获取群文件
    public function getTribeFiles($tribeId) {
      $sql = "select *, think_tribefiles.id as tribe_id from think_tribefiles join " . 
        "think_files on think_files.id = think_tribeFiles.group_file_id where " . 
        "think_tribefiles.im_tribe_id = '$tribeId'";

      return $this->query($sql);
    }

    // 删除群文件
    public function deleteTribeFile($tribeFileId) {
      return $this->delete($tribeFileId);
    }

    

  }


?>