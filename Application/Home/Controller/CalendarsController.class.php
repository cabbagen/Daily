<?php
	namespace Home\Controller;
	use Home\Controller;

  class CalendarsController extends BaseController {

    // 整理每日的任务
    private function arrangeAffairByDay($monthAffairByDay, $affair) {
      $key = $this->getDayFromDateTime($affair);
      if( $monthAffairByDay[$key] ) {
        array_push($monthAffairByDay[$key], $affair);
      } else {
        $monthAffairByDay[$key] = array($affair);
      }
      return $monthAffairByDay;
    }

    // 获取时间中的 `日` 信息
    private function getDayFromDateTime($dateTime) {
      return date_parse($dateTime['affair_time'])['day'];
    }

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

    // 获取单月日程任务数据
    public function getMonthData() {
      $monthAffair = array();

      if( I('timestamp', null) ) {
        $monthDataResult = D('Affairs')->getMonthAffair(I('timestamp', null)/1000);
      } else {
        $monthDataResult = D('Affairs')->getMonthAffair(time());        
      }

      if( is_array($monthDataResult) && count($monthDataResult) >= 0) {
        foreach($monthDataResult as $key => $value) {
          $monthAffair = $this->arrangeAffairByDay($monthAffair, $value);
        }
        $this->ajaxReturn(array('status' => 200, 'monthAffair' => $monthAffair));
      } else {
        $this->ajaxReturnError();
      }

    }

    // 创建日程任务
    public function addAffair() {
      $affairResult = D('Affairs')->addAffair(array(
        'affair_content' => I('affair_content', null),
        'affair_type' => I('affair_type', null),
        'from_calendar_id' => I('from_calendar_id'),
      ));
      $affairList = D('Affairs')->getCategoryItemFromModel('Calendars', I('from_calendar_id', null));

      if($affairResult && $affairList) {
        $this->ajaxReturn(array('status' => 200, 'affairList' => $affairList));
      } else {
        $this->ajaxReturnError();
      }
    }

    // 评价日程任务


  }

?>