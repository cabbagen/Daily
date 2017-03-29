<?php 
  namespace Home\Controller;
	use Home\Controller;

  class GroupController extends BaseController {

    // 退出群
    public function leaveTribe() {
      $tribeId = I('tribeId', null);
      $isAdmin = D('Groups')->checkTribeAdmin($tribeId);

      if($isAdmin) {
        $this->ajaxReturn(array('status' => 205, 'msg' => '您是群主，不能退出该群!'));
      } else {
        $leaveTribeResult = D('Groups')->leaveTribe($tribeId);
        $groupList = D('Groups')->getCategoryItemFromModel('Group', $tribeId);

        if($leaveTribeResult && $groupList) {
          $this->ajaxReturn(array(
            'status' => 200,
            'groupList' => $groupList,
          ));
        } else {
          $this->ajaxReturnError();
        }
      }


    }

  }

?>