<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="description" content="daily application tool" />
		<meta name="keywords" content="daily" />
		<title>daily application tool</title>
		<!-- 引入样式 -->
		<link rel="stylesheet" type="text/css" href="/Public/lib/style/reset.css" />
		
	<link href="/Public/style/login.css" rel="stylesheet" type="text/css" />

	</head>
	<body>
		<!-- 文档内容 -->
		
	<h2>这是用户登录页面</h2>

	<section>
		<form action="<?php echo U('Home/Login/handleLogin');?>" method="post">
			<div>
				<label for="username">username:</label>
				<input type="text" name="username" placeholder="username" />
			</div>
			<div>
				<label for="password">password:</label>
				<input type="password" name="password" />
			</div>
			<button type="submit">submit</button>
		</form>
	</section>


	</body>
	<!-- 脚本文件 -->
	
	<script src="/Public/javascript/login.js" type="text/javascript"></script>

</html>