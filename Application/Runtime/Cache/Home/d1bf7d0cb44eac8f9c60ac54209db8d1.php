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
		
	<link href="/Public/style/login.css" rel="stylesheet" type="text/css" />

	</head>
	<body>
		<!-- 文档内容 -->
		
	<header class="header">
	<div class="logo">
		<img src="/public/images/logo.png" />
	</div>
</header> 

	<section class="content">
		<div class="login-form">
			<h3 class="form-title">账号密码登录</h3>
			<form action="<?php echo U('Home/Login/handleLogin');?>" method="post">
				<div class="field">
					<input type="text" name="username" placeholder="用户名" required="required" />
				</div>
				<div class="field">
					<input type="password" name="password" placeholder="密码" required="required" />
					<?php if($hasError == 1): ?><span class="error">密码输入有误，请重试！</span><?php endif; ?>
				</div>
				<p class="form-remember">
					<input type="checkbox" name="remeber" id="remeber" />
					<label for="remeber">记住密码</label>
				</p>
				<div class="submit">
					<button type="button">立即登录</button>
				</div>
			</form>
			<div class="img">
				<img src="/public/images/flower.png" />
			</div>
		</div>
		<div class="login-helper">
			<div class="helper-item">
				<a href="<?php echo U('Home/Login/regist');?>">现在注册</a>
			</div>
			<div class="helper-item">
				<a href="<?php echo U('Home/Login/forgetPassword');?>">忘记密码</a>
			</div>
			<div class="helper-item">
				<a href="<?php echo U('Home/Login/understandMore');?>">了解详情</a>
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
	
	<script src="/Public/lib/javascript/require.js" data-main="/Public/javascript/login.js" type="text/javascript"></script>

</html>