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

    // 获取时间中的 `单日` 信息
    private function getDayFromDateTime($dateTime) {
      return date_parse($dateTime['affair_time'])['day'];
    }

    // 适配获取各类数据返回结构
    private function adapterGetTypeCompleteData($resultMapArray, $type) {
      return array(
        'name' => $type,
        'completed' => $resultMapArray['completeData'][$type],
        'uncompleted' => $resultMapArray['unCompleteData'][$type],
      );
    }

    // 删除日程任务
    public function deleteAffair() {
      $result = D('Affairs')->deleteAffair(I('affairId', null));
      $affairList = D('Affairs')->getCategoryItemFromModel('Calendars', I('from_calendar_id', null));

      if($result && is_array($affairList)) {
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

      if($affairResult && is_array($affairList)) {
        $this->ajaxReturn(array('status' => 200, 'affairList' => $affairList));
      } else {
        $this->ajaxReturnError();
      }

    }

    // 获取单月日程任务数据
    public function getMonthAffairData() {
      $monthAffair = array();

      if( I('timestamp', null) ) {
        $monthDataResult = D('Affairs')->getMonthAffair(I('timestamp', null)/1000, I('from_calendar_id'));
      } else {
        $monthDataResult = D('Affairs')->getMonthAffair(time(), I('from_calendar_id'));        
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

    // 获取单日日程数据任务数据
    public function getDayAffairData() {
      $dayDataResult = D('Affairs')->getDayAffair(I('timestamp', null) / 1000, I('from_calendar_id'));
      
      if(is_array($dayDataResult)) {
        $this->ajaxReturn(array('status' => 200, 'dayAffairList' => $dayDataResult));
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

      if($affairResult && is_array($affairList)) {
        $this->ajaxReturn(array('status' => 200, 'affairList' => $affairList));
      } else {
        $this->ajaxReturnError();
      }
    }

    // 评价日程任务 => 任务完成
    public function completeAffair() {
      $affairResult = D('Affairs')->completeAffair(I('affairId', null));
      $affairList = D('Affairs')->getCategoryItemFromModel('Calendars', I('from_calendar_id', null));

      if($affairResult && is_array($affairList)) {
        $this->ajaxReturn(array('status' => 200, 'affairList' => $affairList));
      } else {
        $this->ajaxReturnError();
      }
    }

    // 评价日程任务 => 任务未完成
    public function cancelCompleteAffair() {
      $affairResult = D('Affairs')->cancelCompleteAffair(I('affairId', null));
      $affairList = D('Affairs')->getCategoryItemFromModel('Calendars', I('from_calendar_id', null));

      if($affairResult && is_array($affairList)) {
        $this->ajaxReturn(array('status' => 200, 'affairList' => $affairList));
      } else {
        $this->ajaxReturnError();
      }
    }

    // 获取各类完成数据
    public function getTypeCompleteData() {
      $resultMapArray = D('Affairs')->getCompleteRate(I('from_calendar_id'));
      
      if($resultMapArray) {
        $this->ajaxReturn(array(
          'status' => 200, 
          'data' => array(
            $this->adapterGetTypeCompleteData($resultMapArray, '重要且紧急的事情'),
            $this->adapterGetTypeCompleteData($resultMapArray, '重要不紧急的事情'),
            $this->adapterGetTypeCompleteData($resultMapArray, '不重要紧急的事情'),
            $this->adapterGetTypeCompleteData($resultMapArray, '不重要不紧急的事情'),
          ),
        ));
      } else {
        $this->ajaxReturnError();
      }
    }

    

  }

?>