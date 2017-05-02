<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="description" content="daily application tool" />
		<meta name="keywords" content="daily" />
		<title>daily application tool</title>
		<link rel="icon" href="/Public/images/icon.png" />
		<!-- 引入样式 -->
		<link rel="stylesheet" type="text/css" href="/Public/lib/style/reset.css" />
		<link rel="stylesheet" type="text/css" href="/Public/lib/style/common.css" />
		
  <style type="text/css">
    ::-webkit-scrollbar {
      width: 0px;
    }
    .error-tip {
      text-align: center; margin-top: 50px;
    }
    .error-tip b {
      font-size: 40px;
    }
  </style>

	</head>
	<body>
		<!-- 文档内容 -->
		
  <?php if($errorTip): ?><div class="error-tip">
      <p><b>500</b></p>
      <p><?php echo ($errorTip); ?></p>
    </div><?php endif; ?>

	</body>
	<!-- 脚本文件 -->
	<script type="text/javascript" src="/Public/lib/javascript/jquery.js"></script>
	
  <script type="text/javascript" src="https://g.alicdn.com/aliww/??h5.imsdk/2.1.0/scripts/yw/wsdk.js,h5.openim.kit/0.3.7/scripts/kit.js" charset="utf-8"></script>
	<script type="text/javascript">
    WKIT.init( $.extend({}, <?php echo ($imInfos); ?>, {
      avatar : '/Public/images/chatAvator.jpg',
      toAvatar : '/Public/images/chatAvator2.jpg'
    }) );
	</script>
  <script type="text/javascript">
    // 离开此页面时，提示用户刷新主页面
    document.addEventListener('unload', function() {
      alert('关闭聊天页面后，您需要刷新主页面');
    }, false);
    
  </script>

</html>