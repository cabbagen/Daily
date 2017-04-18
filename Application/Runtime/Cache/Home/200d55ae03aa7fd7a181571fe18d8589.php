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
		
	<link href="/Public/style/forgetPassword.css" rel="stylesheet" type="text/css" />

	</head>
	<body>
		<!-- 文档内容 -->
		
		<header class="header">
	<div class="logo">
		<img src="/public/images/logo.png" />
	</div>
</header>
		<section class="content">
			<h2>找回密码</h2>
			<div class="form">
				<div>
					<span>请输入您的 email</span>
					<input type="email" name="email" placeholder="请输入您的 email" />
				</div>
				<div>
					<button type="button">找回密码</button>
				</div>
			</div>
		</section>
		<footer class="footer">
	<p>
		<span>友情链接：</span>
		<a href="#" target="_blank">花瓣网</a>
		<a href="#" target="_blank">设计中国</a>
		<a href="#" target="_blank">爱物网</a>
		<a href="#" target="_blank">豆丁网</a>
		<a href="#" target="_blank">携程攻略</a>
		<a href="#" target="_blank">LADYMAX时尚</a>
	</p>
	<p>
		<span>版权所有：</span>
		<span>20170203号</span>
	</p>
</footer>

	</body>
	<!-- 脚本文件 -->
	<script type="text/javascript" src="/Public/lib/javascript/jquery.js"></script>
	
	<script src="/Public/lib/javascript/require.js" data-main="/Public/javascript/forgetPassword.js?num="+(new Date()) type="text/javascript"></script>

</html>