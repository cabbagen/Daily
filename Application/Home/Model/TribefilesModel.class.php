<?php
	namespace Home\Model;
	use Home\Model;
  
  class TribefilesModel extends BaseModel {

    // 获取群文件
    public function getTribeFiles($tribeId) {
      return $this->where(array('im_tribe_id' => $tribeId))->select();
    }

  }


?>