<?php
  namespace Home\Controller;
	use Home\Controller;

  class CategoryController extends BaseController {
    
    // 分页及模糊查询用户名接口
    public function searchFriends() {
      $start = ( I('currentPage', null) - 1 ) * I('pageSize', null);
      $length = I('pageSize', null);
      $keyWord = I('keyWord', null) ? I('keyWord', null) : '';

      $frinedsResult = D('Friends')->searchFriends($start, $length, $keyWord);

      if($frinedsResult) {
        $this->ajaxReturn(array('status' => 200,'data' => array(
            'usersList' => $frinedsResult,
            'totalPage' => count($frinedsResult),
          ),
        ));
      } else {
        $this->ajaxReturnError();
      }
      
    }

    


  }

?>