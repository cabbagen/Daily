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
        $groupList = D('Groups')->getUserMenuCatetoryInfosFromModel('Group', $tribeId);

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

    // 邀请加群
    public function inviteJoinTribe() {
      
    }

    // 解散群
    public function dismissTribe() {
      $tribeId = I('tribeId', null);
      $isAdmin = D('Groups')->checkTribeAdmin($tribeId);

      if($isAdmin) {
        $dismissTribeResult = D('Groups')->deleteItemFromModel( array('id' => $tribeId) );
        $groupList = D('Groups')->getUserMenuCatetoryInfosFromModel('Group', $tribeId);

        if($dismissTribeResult && $groupList) {
          $this->ajaxReturn(array('status' => 200, 'groupList' => $groupList));
        } else {
          $this->ajaxReturnError();
        }
      } else {
        $this->ajaxReturn(array('status' => 205, 'msg' => '您不是群主，不能解散该群'));
      }
    }

  }

?>