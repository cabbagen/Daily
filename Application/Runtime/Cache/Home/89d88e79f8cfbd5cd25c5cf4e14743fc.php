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
		
	<link href="/Public/style/regist.css" rel="stylesheet" type="text/css" />

	</head>
	<body>
		<!-- 文档内容 -->
		
	<header class="header">
	<div class="logo">
		<img src="/public/images/logo.png" />
	</div>
</header>

	<div class="content">
		<h2 class="title">用户注册</h2>
		<form action="" method="post">
			<div class="field">
				<label><span>用户名</span><input type="text" name="username" data-condition="required" /></label>
				<i class="error">这里不能为空！</i>
			</div>
			<div class="field">
				<label><span>昵称</span><input type="text" name="nickname" data-condition="required" /></label>
				<i class="error">这里不能为空！</i>
			</div>
			<div class="field">
				<label><span>密码</span><input type="password" name="password" data-condition="required" /></label>
				<i class="error">这里不能为空！</i>
			</div>
			<div class="field">
				<label>
					<span>Email</span>
					<input type="email" name="email" data-condition="^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$ required" />
				</label>
				<i class="error">请输入合法的Email！</i>
			</div>
			<div class="field gender">
				<span>性别</span>
				<strong>
					<label for="man">男</label>
					<input type="radio" name="gender" value="man" id="man" data-condition="required" />
				</strong>
				<strong>
					<label for="woman">女</label>
					<input type="radio" name="gender" value="woman" id="woman" data-condition="required" />
				</strong>
				<strong>
					<label for="unknow">保密</label>
					<input type="radio" name="gender" value="unknow" id="unknow" data-condition="required" />
				</strong>
				<i class="error">这里不能为空！</i>
			</div>
			<div class="field extra">
				<p>一句话表达你的个性！</p>
				<textarea name="extra" placeholder="写出你的个性签名~~~"></textarea>
			</div>
			<div class="submit">
				<button type="button">保存提交</button>
			</div>
		</form>
		<div class="upload-avator">
			<div class="image-show" title="点击上传头像">
			</div>
			<div class="avator">
				<input type="file" name="avator" />
				<button type="button">头像上传</button>
			</div>
		</div>
	</div>

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
	
	<script src="/Public/lib/javascript/require.js" data-main="/Public/javascript/regist.js" type="text/javascript"></script>

</html>