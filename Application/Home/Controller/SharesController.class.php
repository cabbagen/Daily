<?php 
  namespace Home\Controller;
	use Home\Controller;
  Vendor('php-markdown-lib.Michelf.Markdown#inc');
  Vendor('Markdownify-master.src.index');

	class SharesController extends BaseController {

		// 删除分享
    public function deleteShareFile() {
      $deleteResult = D('Shares')->deleteShareFile( I('fileId', null), I('type', null) );

      if($deleteResult) { 
        $shareFiles = D('Shares')->getCategoryItemFromModel('Shares', I('type', null));
        if(is_array($shareFiles)) {
          $this->ajaxReturn(array('status' => 200, 'shareFiles' => $shareFiles));
        } else {
          $this->ajaxReturnError();
        }
      } else {
        $this->ajaxReturnError();
      }
    }

    // 测试 html 与 md 文件转化
    public function markdownDemo() {
      $fileContent = file_get_contents('./Public/markdown.md');
      // var_dump(\Mardown);
      $html = \Michelf\Markdown::defaultTransform($fileContent);
      
      echo $html;
    }

    public function htmlDome() {
      $converter = new \Markdownify\Converter;
      $markdown = $converter->parseString('<span>Heading</span>');

      echo $markdown;
    }

	}
?>