<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="description" content="daily application tool" />
		<meta name="keywords" content="daily" />
		<title>daily application tool</title>
		<!-- 引入样式 -->
		<link rel="stylesheet" type="text/css" href="/Public/lib/style/reset.css" />
		<link rel="stylesheet" type="text/css" href="/Public/lib/style/common.css" />
		
  <link href="/public/lib/style/simditor.css" rel="stylesheet" type="text/css" />

	</head>
	<body>
		<!-- 文档内容 -->
		
  <div id="root">
    
  </div>

	</body>
	<!-- 脚本文件 -->
	<script type="text/javascript" src="/Public/lib/javascript/jquery.js"></script>
	
	<script type="text/javascript">
		window.userInfo = <?php echo ($userInfo); ?>;
	</script>
  <script type="text/javascript" src="/public/lib/javascript/module.min.js"></script>
  <script type="text/javascript" src="/public/lib/javascript/hotkeys.min.js"></script>
  <script type="text/javascript" src="/public/lib/javascript/uploader.min.js"></script>
  <script type="text/javascript" src="/public/lib/javascript/simditor.min.js"></script>    
  <script type="text/javascript" src="http://localhost:9000/app.js"></script>

</html>