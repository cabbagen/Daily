<?php
	namespace Home\Controller;
	use Home\Controller;

  class CalendarsController extends BaseController {

    // 删除日程任务
    public function deleteAffair() {
      $result = D('Affairs')->deleteAffair(I('affairId', null));
      $affairList = D('Affairs')->getCategoryItemFromModel('Calendars', I('from_calendar_id', null));

      if($result && $affairList) {
        $this->ajaxReturn(array('status' => 200, 'affairList' => $affairList));
      } else {
        $this->ajaxReturnError();
      }
    }

    // 更新日程任务
    public function updateAffair() {
      $affairResult = D('Affairs')->updateAffair(array(
        'id' => I('id', null),
        'affair_content' => I('affair_content', null),
      ));
      $affairList = D('Affairs')->getCategoryItemFromModel('Calendars', I('from_calendar_id', null));

      if($affairResult && $affairList) {
        $this->ajaxReturn(array('status' => 200, 'affairList' => $affairList));
      } else {
        $this->ajaxReturnError();
      }

    }

    // 获取本月日程任务数据
    public function getMonthData() {
      
    }

    // 创建日程任务

    // 评价日程任务


  }

?>