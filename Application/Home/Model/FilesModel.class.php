<?php
	namespace Home\Model;
	use Home\Model;

	class FilesModel extends BaseModel {
    
    public function deleteFile($fileId) {
      return $this->delete($fileId);
    }

		public function getFile($fileId) {
			return $this->where(array('id' => $fileId))->find();
		}

		public function updateFile($fileArray) {
			return $this->where(array('id' => $fileArray['id']))->setField('file_name', $fileArray['file_name']);
		}

		public function saveFile($fieldArray) {
			return $this->data($fieldArray)->add();
		}

	}

?>