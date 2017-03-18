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
		
	<link href="/Public/style/users.css" rel="stylesheet" type="text/css" />

	</head>
	<body>
		<!-- 文档内容 -->
		
	<h2>这是用户个人中心页面</h2>
	<div id="demo_content"></div>

	</body>
	<!-- 脚本文件 -->
	<script type="text/javascript" src="/Public/lib/javascript/jquery.js"></script>
	
	<script src="/Public/javascript/users.js" type="text/javascript"></script>
	<script type="text/javascript">
		$.get("/Public/files/uploadFiles/demo.txt", function(data) {
			$('#demo_content').html(data);
			
		});
	</script>

</html>