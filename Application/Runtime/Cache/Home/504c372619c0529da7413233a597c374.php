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
  </style>

	</head>
	<body>
		<!-- 文档内容 -->
		
  <p><?php echo ($friendId); ?></p>

	</body>
	<!-- 脚本文件 -->
	<script type="text/javascript" src="/Public/lib/javascript/jquery.js"></script>
	
  
  <script type="text/javascript" src="https://g.alicdn.com/aliww/??h5.imsdk/2.1.0/scripts/yw/wsdk.js,h5.openim.kit/0.3.7/scripts/kit.js" charset="utf-8"></script>
	<script type="text/javascript">
    window.selfImInfo = <?php echo ($selfImInfo); ?>;
    window.toImInfo = <?php echo ($toImInfo); ?>;
    WKIT.init({
      uid : window.selfImInfo.userid,
      appkey : 23454789,
      credential : window.selfImInfo.password,
      touid : window.toImInfo.userid
    });
	</script>

</html>